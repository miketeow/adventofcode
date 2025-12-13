import fs from "node:fs";
import path from "node:path";

const inputPath = path.join(__dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const array = input.split("\n");

const mod = (n, m) => {
  return ((n % m) + m) % m;
};

const passBy = (right, current, steps) => {
  let counter = 0;
  let remainder = 0;
  if (steps >= 100) {
    counter = Math.floor(steps / 100);
  }

  remainder = steps % 100;

  if (right) {
    if (current + remainder > 99) {
      counter++;
    }
  } else {
    if (current - remainder <= 0 && current !== 0) {
      counter++;
    }
  }
  return counter;
};
const newSolution = (rotations) => {
  let dial = 50;
  let totalPassby = 0;

  for (let i = 0; i < rotations.length; i++) {
    let passByZeroDial = 0;
    let steps = parseInt(rotations[i].slice(1));
    if (rotations[i][0] === "R") {
      passByZeroDial = passBy(true, dial, steps);

      dial = mod(dial + steps, 100);
    } else {
      passByZeroDial = passBy(false, dial, steps);
      dial = mod(dial - steps, 100);
    }

    totalPassby += passByZeroDial;
  }

  return totalPassby;
};

const result = newSolution(array);
console.log(`The result is ${result}`);
