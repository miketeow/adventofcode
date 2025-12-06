fn main() {
  // let input = fs::read_to_string("../sampleinput.txt").expect("Error reading input.txt");
  let input: &str = include_str!("../../input.txt");
  let mut start: i32 = 50;
  let mut result: i32 = 0;
  for line in input.lines(){
    // println!("Direction: {}, Number: {}", line.chars().next().unwrap(), &line[1..]);
    if line.chars().next().unwrap() == 'R' {
      start = (start + &line[1..].parse::<i32>().unwrap()) % 100;
    } else {
      start = start - (&line[1..].parse::<i32>().unwrap() % 100);
      if start < 0{
        start = 100 + start;
      }
    }
    if start == 0 {
      result += 1;
    }
  }

  println!("The result is: {}", result);
  println!("The result using the functionis: {}", solve(input));
}

fn solve(input: &str) -> i32 {
  let mut start: i32 = 50;
  let mut result: i32 = 0;

  for line in input.lines() {
    let num = line[1..].parse::<i32>().unwrap();
    let move_amount = if line.starts_with('R') {num} else {-num};
    start = (start + move_amount).rem_euclid(100);
    if start == 0 {
      result += 1;
    }
  }
  result
}
