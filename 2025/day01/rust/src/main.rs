use std::fs;

fn main() {
  let input = fs::read_to_string("../input.txt").expect("Error reading input.txt");
    println!("--- Rust Output ---");
    println!("{}", input);
    println!("--- End of Rust Output ---");
}
