import { LoaderFunction } from "@remix-run/node";
import { Feed } from "feed";
import sortOn from "sort-on";
import { useAwesomeYasunori } from "~/hooks/use-awsome-yasunori";

const domain = `https://awesome.yasunori.dev`;

export const loader = (async () => {
  const awsomeYasunori = await useAwesomeYasunori();

  const feed = new Feed({
    title: "Awesome Yasunori",
    description: "Awesome Yasunori",
    id: domain,
    link: domain,
    language: "ja",
    copyright: `Nirunari Yasunori Sukinishiro License 2024`,
    feedLinks: {
      rss: `${domain}/rss.xml`,
    },
  });

  if (awsomeYasunori) {
    const sortedAwsomeYasunori = sortOn(awsomeYasunori, "-date");
    for (const yasunori of sortedAwsomeYasunori) {
      feed.addItem({
        link: `${domain}#${yasunori.id}`,
        date: new Date(yasunori.date),
        title: yasunori.title,
        description: yasunori.content,
      });
    }
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=2419200",
    },
  });
}) satisfies LoaderFunction;
