fn main() {
  // let input = fs::read_to_string("../sampleinput.txt").expect("Error reading input.txt");
  let input: &str = include_str!("../../input.txt");
  let mut start: i32 = 50;
  let mut result: i32 = 0;
  for line in input.lines(){
    // println!("Direction: {}, Number: {}", line.chars().next().unwrap(), &line[1..]);
    if line.chars().next().unwrap() == 'R' {
      start = (start + line[1..].parse::<i32>().unwrap()) % 100;
    } else {
      start = start - (line[1..].parse::<i32>().unwrap() % 100);
      if start < 0{
        start = 100 + start;
      }
    }
    if start == 0 {
      result += 1;
    }
  }

  println!("The result is: {}", result);
  println!("The result using the function is: {}", solve(input));
}

fn solve(input: &str) -> i32 {
  let mut current: i32 = 50;
  let mut result: i32 = 0;

  for line in input.lines() {
    // 1. parse the number, always positive
    let num = line[1..].parse::<i32>().unwrap();

    // 2. determine the direction
    let is_right = line.starts_with('R');

    // 3. calculate pass_by using magnitude
    let counter = pass_by(is_right,current, num);
    // 4. update the counter
    result += counter;

    // 5. update the position
    let move_amount = if is_right {num} else {-num};
    current = (current + move_amount).rem_euclid(100);

  }
  result
}

fn pass_by(is_right: bool, current: i32, num: i32) -> i32{
  let mut counter =  num / 100;
  let remainder: i32 = num % 100;

  if is_right{
    if current + remainder > 99 {
      counter += 1
    }
  } else {
    if current - remainder <= 0 && current != 0 {
      counter += 1
    }
  }
  counter
}
