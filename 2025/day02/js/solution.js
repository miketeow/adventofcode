import fs from "node:fs";
import path from "node:path";
const sampleInputPath = path.join(__dirname, "../sampleinput.txt");
const sampleInput = fs.readFileSync(sampleInputPath, "utf-8").trim();
const testInputPath = path.join(__dirname, "../testinput.txt");
const testInput = fs.readFileSync(testInputPath, "utf-8").trim();
const inputPath = path.join(__dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();
const testArray = testInput.split("\n");
const sampleArray = sampleInput.split("\n");
const array = input.split(",");

const partOne = (inputArray) => {
  let result = 0;

  for (let i = 0; i < inputArray.length; i++) {
    let [startRange, endRange] = inputArray[i]
      .split("-")
      .map((num) => parseInt(num));

    let resultArray = [];
    for (let j = startRange; j <= endRange; j++) {
      let numString = String(j);
      if (numString.length === 2) {
        let setNum = new Set(numString);
        if (setNum.size == 1) {
          resultArray.push(j);
          result += j;
        }
      }
      if (numString.length % 2 == 0 && numString.length != 2) {
        let firstHalf = numString.slice(0, numString.length / 2);
        let secondHalf = numString.slice(numString.length / 2);
        if (firstHalf === secondHalf) {
          resultArray.push(j);
          result += j;
        }
      }
    }
    if (resultArray.length > 0) {
      console.log(`${startRange} - ${endRange} has invalid id: ${resultArray}`);
    }
  }

  console.log(`The result is ${result}`);
};

// partOne(testArray);

const isPrime = (value) => {
  if (value <= 1) {
    return false;
  }
  for (let x = 2; x < value; x++) {
    if (value % x == 0) {
      return false;
    }
  }
  return true;
};

const findFactors = (value) => {
  let factors = [];

  for (let i = 2; i <= Math.sqrt(value); i++) {
    if (value % i === 0) {
      factors.push(i);

      let partner = value / i;

      if (partner !== i) {
        factors.push(partner);
      }
    }
  }
  return factors.sort((a, b) => a - b);
};

const partTwo = (inputArray) => {
  let result = 0;

  for (let i = 0; i < inputArray.length; i++) {
    let [startRange, endRange] = inputArray[i]
      .split("-")
      .map((num) => parseInt(num));

    let resultArray = [];
    for (let j = startRange; j <= endRange; j++) {
      let numString = String(j);
      if (numString.length >= 2) {
        let setNum = new Set(numString);
        if (setNum.size == 1) {
          resultArray.push(j);
          result += j;
          continue;
        }
      }

      if (numString.length == 4) {
        let firstHalf = numString.slice(0, numString.length / 2);
        let secondHalf = numString.slice(numString.length / 2);
        if (firstHalf === secondHalf) {
          resultArray.push(j);
          result += j;
        }
      }

      if (numString.length >= 6 && !isPrime(numString.length)) {
        let previous = 0;
        let current = 0;

        let factors = findFactors(numString.length);

        let foundSequence = false;
        let sequenceArray = [];
        for (let k = factors.length - 1; k >= 0; k--) {
          for (let len = 0; len < numString.length; len += factors[k]) {
            if (previous == 0) {
              previous = numString.slice(len, len + factors[k]);

              sequenceArray.push(previous);
            } else {
              current = numString.slice(len, len + factors[k]);

              if (current == previous) {
                sequenceArray.push(current);
                previous = current;
                if (len + factors[k] == numString.length) {
                  resultArray.push(j);
                  result += j;
                  foundSequence = true;
                }
              } else {
                sequenceArray = [];
                previous = 0;
                break;
              }
            }
          }

          if (foundSequence) {
            break;
          }
        }
      }
    }
    if (resultArray.length > 0) {
      console.log(`${startRange} - ${endRange} has invalid id: ${resultArray}`);
    }
  }

  console.log(`The result is ${result}`);
};

partTwo(array);
