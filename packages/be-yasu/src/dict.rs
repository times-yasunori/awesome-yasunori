use colored::Colorize;
use std::fs::{self, File};
use std::io;
use std::io::{BufReader, BufWriter};
use std::path::PathBuf;
use vibrato::Dictionary;
use zstd::stream::copy_decode;

/// get dictionary by dict path given by env variable
pub fn get_dict_path() -> PathBuf {
    let dict_path = option_env!("BE_YASU_DICT_PATH")
        .expect("environment value `BE_YASU_DICT_PATH` is not set.");
    PathBuf::from(&dict_path.to_string())
}

/// extract dictionary and read it
pub fn get_dict() -> io::Result<Dictionary> {
    let dict_path = get_dict_path();
    let cache_dir_path = option_env!("XDG_CACHE_HOME");
    let extracted_dict_dir = match cache_dir_path {
        Some(path) => PathBuf::from(path),
        None => PathBuf::from(format!("{}/{}", env!("HOME"), ".cache/be-yasu")),
    };
    let extracted_dict_dir = extracted_dict_dir.as_path();

    // path used to cache the extracted dict
    let extracted_path = extracted_dict_dir.join(PathBuf::from(
        dict_path.file_name().unwrap().to_string_lossy().to_string() + ".cached",
    ));

    println!("using dict: {}", &dict_path.to_string_lossy().yellow());

    if !extracted_path.exists() {
        let extracted_path_parent = extracted_path.parent().unwrap();
        if !extracted_path_parent.exists() {
            fs::create_dir_all(extracted_path_parent)?;
        }

        let dict_path = get_dict_path();

        println!("extracting dict encoded by zstandard...");

        // save the extracted file
        let input_file =
            File::open(&dict_path).expect("failed to open dict in `$BE_YASU_DICT_PATH`");
        let output_file =
            File::create(&extracted_path).expect("failed to open dict which will cached");

        let mut reader = BufReader::new(&input_file);
        let mut writer = BufWriter::new(&output_file);
        copy_decode(&mut reader, &mut writer)?;
        println!("dict was extracted!");
    } else {
        println!(
            "cached dict found: {}",
            extracted_path.to_string_lossy().yellow()
        );
    }
    println!("loading dict...");

    let extracted_file = File::options().read(true).open(&extracted_path)?;
    let dict = Dictionary::read(&extracted_file).unwrap();

    println!("{}", "dict was completely loaded!".yellow());
    println!();
    Ok(dict)
}
