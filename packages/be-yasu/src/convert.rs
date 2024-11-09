use std::io;
use vibrato::token::Token;
use vibrato::{Dictionary, Tokenizer};

#[derive(Clone, Debug, Default, PartialEq)]
pub struct WordToken {
    pub surface: String,
    pub feature: String,
}

impl WordToken {
    fn from(token: &Token) -> Self {
        let surface = token.surface().to_string();
        let feature = get_type_from_token(token);
        WordToken { surface, feature }
    }

    #[cfg(test)]
    /// it is used for testing
    fn new(surface: String, feature: String) -> Self {
        Self { surface, feature }
    }
}

pub struct Converter {
    tokenizer: Tokenizer,
}

impl Converter {
    pub fn new(dict: Dictionary) -> Self {
        let tokenizer = Tokenizer::new(dict);
        Self { tokenizer }
    }

    pub fn parse(&self, input: String) -> io::Result<Vec<WordToken>> {
        let mut worker = self.tokenizer.new_worker();

        worker.reset_sentence(input);
        worker.tokenize();

        let iter = worker.token_iter();
        let word_token_iter = iter.map(|t| WordToken::from(&t)).collect();
        Ok(word_token_iter)
    }

    pub fn convert(&self, input: String) -> io::Result<String> {
        let parsed_iter = &self.parse(input)?;

        let mut new_text = "".to_string();
        let mut is_noun = false;
        for token in parsed_iter.iter() {
            if !is_noun && token.feature == "名詞" {
                new_text += "yasunori";
                is_noun = true;
            } else {
                new_text += &*token.surface;
                is_noun = false;
            }
        }
        Ok(new_text)
    }
}

fn get_type_from_token(token: &Token) -> String {
    token.feature().split(",").next().unwrap().to_string()
}

#[cfg(test)]
mod tests {
    use crate::convert::{Converter, WordToken};
    use crate::dict::get_dict;
    use std::io;

    #[test]
    fn parse_works() -> io::Result<()> {
        let dict = get_dict()?;

        let input = Converter::new(dict).parse("メロスは激怒した。".to_string())?;
        let output = vec![
            WordToken::new("メロス".to_string(), "名詞".to_string()),
            WordToken::new("は".to_string(), "助詞".to_string()),
            WordToken::new("激怒".to_string(), "名詞".to_string()),
            WordToken::new("し".to_string(), "動詞".to_string()),
            WordToken::new("た".to_string(), "助動詞".to_string()),
            WordToken::new("。".to_string(), "記号".to_string()),
        ];
        assert_eq!(input, output);

        Ok(())
    }

    #[test]
    fn convert_works() -> io::Result<()> {
        let dict = get_dict()?;

        let input = Converter::new(dict).convert("メロスは激怒した。".to_string())?;
        let output = "yasunoriはyasunoriした。".to_string();
        assert_eq!(input, output);

        Ok(())
    }
}
