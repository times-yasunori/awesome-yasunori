use crate::convert::Converter;
use crate::dict::get_dict;
use colored::Colorize;
use inquire::ui::{RenderConfig, Styled};
use inquire::{min_length, Text};

pub fn start_interactive_mode() {
    // It might be a high cost function.
    let dict = get_dict().expect("failed to load dict");
    let converter = Converter::new(dict);

    loop {
        let input = Text::new("")
            .with_validator(min_length!(1))
            .with_render_config(RenderConfig {
                // make prefix ">"
                prompt_prefix: Styled::new(&">".bold().green().to_string()),
                ..Default::default()
            })
            .prompt();

        if let Ok(name) = input {
            let converted = &converter.convert(name);
            if let Ok(converted) = converted {
                println!("{}", converted)
            }
        } else {
            break;
        };
    }
}
