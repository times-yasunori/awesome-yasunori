mod cli;
mod convert;
mod dict;
mod interactive;

use crate::cli::Cli;
use crate::convert::Converter;
use crate::dict::get_dict;
use crate::interactive::start_interactive_mode;
use clap::Parser;
use std::io;

fn main() -> io::Result<()> {
    let dict = get_dict()?;
    let input = Converter::new(dict).parse("メロスは激怒した。".to_string())?;

    for x in input.iter() {
        println!(
            r#"WordToken::new("{}".to_string(), "{}".to_string()),"#,
            x.surface, x.feature
        );
    }

    let cli = Cli::parse();

    if cli.interactive {
        start_interactive_mode();
    } else if let Some(text) = cli.name {
        let converter = Converter::new(get_dict()?);
        println!("{}", converter.convert(text)?)
    }
    Ok(())
}
