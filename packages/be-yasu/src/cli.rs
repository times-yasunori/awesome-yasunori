use clap::Parser;

#[derive(Parser)]
#[command(version, about = "It should be yasunori!!")]
pub struct Cli {
    /// given string to convert
    pub name: Option<String>,

    // /// whether the process of converting will be displayed or not
    // #[arg(short, long, default_value_t = false)]
    // pub raw: bool
    /// use interactive mode
    #[arg(short, long, default_value_t = false)]
    pub interactive: bool,
}
