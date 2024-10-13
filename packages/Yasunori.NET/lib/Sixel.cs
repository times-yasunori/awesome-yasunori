using System.Diagnostics;
using System.Text;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Processing.Processors.Quantization;

namespace Yasunori.Net;

public class Sixel
{
    const char ESC = (char)0x1b;
    const byte specialChNr = (byte)0x6d;
    const byte specialChCr = (byte)0x64;

    const int MAX_PALLETE_LENGTH = 255;

    static readonly char[] SixelStart = [ESC, 'P', 'q'];
    static readonly char[] SixcelEnd = [ESC, '\\'];

    [Conditional("DEBUG")]
    static void DebugPrint(string msg, ConsoleColor fg = ConsoleColor.Magenta, bool lf = false)
    {
        var currentFg = Console.ForegroundColor;
        Console.ForegroundColor = fg;
        if (lf)
            Console.WriteLine(msg);
        else
            Console.Write(msg);
        Console.ForegroundColor = currentFg;
    }

    /// <summary>
    /// Encode Image stream to Sixel string
    /// </summary>
    /// <param name="stream">Image Stream</param>
    /// <returns>Sxiel string</returns>
    public static string Encode(Stream stream)
    {
        var img = Image.Load<Rgb24>(stream);
        // 減色処理
        img.Mutate(x => {
            var size = x.GetCurrentSize();
            x.Resize(size.Width / 2, size.Height / 2)
             .Quantize(KnownQuantizers.Octree);
        });
        var width = img.Width;
        var height = img.Height;

        DebugPrint($"Width: {width}, Height: {height}, (bpp={img.PixelType.BitsPerPixel})", lf: true);

        // カラーパレットの構築
        // XXX: もっと良い方法がありそう
        Rgb24[] colorPalette;
        using (var quantizer = KnownQuantizers.Octree.CreatePixelSpecificQuantizer<Rgb24>(img.Configuration))
        {
            quantizer.BuildPalette(new DefaultPixelSamplingStrategy(), img);
            colorPalette = new HashSet<Rgb24>(quantizer.Palette.ToArray()).ToArray();
        }

        //
        // https://github.com/mattn/go-sixel/blob/master/sixel.go の丸パクリです！！
        //
        var sb = new StringBuilder();
        sb.Append(SixelStart);
        // DECSIXEL Introducer(\033P0;0;8q) + DECGRA ("1;1): Set Raster Attributes
        sb.Append(new char[] { ESC, 'P', ';', '0', ';', '8', 'q', '"', '1', ';', '1' });
        sb.Append($"{width};{height}");

        DebugPrint($"Pallete Start Length={colorPalette.Length}", lf: true);
        for (var i = 0; i < colorPalette.Length; i++)
        {
            var rgb = colorPalette[i];
            var (r, g, b) = (rgb.R * 100 / 0xFF, rgb.G * 100 / 0xFF, rgb.B * 100 / 0xFF);
            // DECGCI (#): Graphics Color Introducer
            sb.Append($"#{i};2;{r:d};{g:d};{b:d}");
            DebugPrint($"#{i};2;", ConsoleColor.Red);
            DebugPrint($"{r:d};{g:d};{b:d}", ConsoleColor.Green);
        }
        DebugPrint("End Palette", ConsoleColor.DarkGray, true);

        var buffer = new byte[width * MAX_PALLETE_LENGTH];
        var cset = new bool[MAX_PALLETE_LENGTH];
        var ch0 = specialChNr;
        for (var z = 0; z < (height + 5) / 6; z++)
        {
            if (z > 0) {
                // DECGNL (-): Graphics Next Line
                sb.Append('-');
                DebugPrint($"NL", lf: true);
            }
            DebugPrint($"[z={z}]", ConsoleColor.DarkGray);
            for (var p = 0; p < 6; p++)
            {
                var y = z * 6 + p;
                for (var x = 0; x < width && y < height; x++)
                {
                    var rgb = img[x, y];
                    var idx = Array.IndexOf(colorPalette, rgb);
                    cset[idx] = true;
                    buffer[width * idx + x] |= (byte)(1 << p);
                }
            }
            for (var n = 0; n < MAX_PALLETE_LENGTH; n++)
            {
                if (!cset[n]) continue;

                DebugPrint($"[n={n}]", ConsoleColor.DarkGray);
                cset[n] = false;
                if (ch0 == specialChCr)
                {
                    // DECGCR ($): Graphics Carriage Return
                    sb.Append('$');
                    DebugPrint($"CR");
                }

                sb.Append($"#{n}");
                DebugPrint($"#{n}", ConsoleColor.Red, false);
                var cnt = 0;
                for (var x = 0; x < width; x++)
                {
                    // make sixel character from 6 pixels
                    var bufIndex = width * n + x;
                    var ch = buffer[bufIndex];
                    buffer[bufIndex] = 0;
                    if (ch0 < 0x40 && ch != ch0)
                    {
                        var sixelChar = (char)(63 + ch0);
                        for (; cnt > 255; cnt -= 255)
                        {
                            sb.Append("!255").Append(sixelChar);
                            DebugPrint($"!255{sixelChar}", ConsoleColor.Yellow);
                        }
                        if (cnt == 1)
                        {
                            sb.Append(sixelChar);
                            DebugPrint($"{sixelChar}", ConsoleColor.Yellow);
                        }
                        else if (cnt == 2)
                        {
                            sb.Append([sixelChar, sixelChar]);
                            DebugPrint($"{sixelChar}{sixelChar}", ConsoleColor.Yellow);
                        }
                        else if (cnt == 3)
                        {
                            sb.Append([sixelChar, sixelChar, sixelChar]);
                            DebugPrint($"{sixelChar}{sixelChar}{sixelChar}", ConsoleColor.Yellow);
                        }
                        else
                        {
                            sb.Append($"!{cnt}").Append(sixelChar);
                            DebugPrint($"!{cnt}{sixelChar}", ConsoleColor.Yellow);
                        }
                        cnt = 0;
                    }
                    ch0 = ch;
                    cnt++;
                }
                if (ch0 != 0)
                {
                    var sixelChar = (char)(63 + ch0);
                    for (; cnt > 255; cnt -= 255)
                    {
                        sb.Append("!255").Append(sixelChar);
                        DebugPrint($"!255{sixelChar}", ConsoleColor.Cyan);
                    }
                    if (cnt == 1)
                    {
                        sb.Append(sixelChar);
                        DebugPrint($"{sixelChar}", ConsoleColor.Cyan);
                    }
                    else if (cnt == 2)
                    {
                        sb.Append([sixelChar, sixelChar]);
                        DebugPrint($"{sixelChar}{sixelChar}", ConsoleColor.Cyan);
                    }
                    else if (cnt == 3)
                    {
                        sb.Append([sixelChar, sixelChar, sixelChar]);
                        DebugPrint($"{sixelChar}{sixelChar}{sixelChar}", ConsoleColor.Cyan);
                    }
                    else
                    {
                        sb.Append($"!{cnt}").Append(sixelChar);
                        DebugPrint($"!{cnt}{sixelChar}", ConsoleColor.Cyan);
                    }
                    cnt = 0;
                }
                ch0 = specialChCr;
            }
        }
        sb.Append(SixcelEnd);
        DebugPrint("End", ConsoleColor.DarkGray, true);
        return sb.ToString();
    }
}
