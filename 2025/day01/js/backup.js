import fs from "node:fs";
import path from "node:path";

const inputPath = path.join(__dirname, "../sampleinput.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const array = input.split("\n");

const solution = (rotations) => {
  let dial = 50;
  let pointAtZero = 0;
  let passByPerRotation = 0;
  let totalpassby = 0;
  console.log("The dial starts by pointing at " + dial);

  for (let i = 0; i < rotations.length; i++) {
    let step = parseInt(rotations[i].slice(1));
    if (step == 0) {
      continue;
    }
    // start 50
    // L75
    if (rotations[i][0] === "L") {
      let nextTargetZero = dial > 0 ? 0 : -100;

      for (let target = nextTargetZero; target >= dial - step; target -= 100) {
        passByPerRotation++;
      }

      dial = dial - (step % 100);

      if (dial < 0) {
        dial = 100 + dial;
      }
      logMessage(rotations[i], dial, passByPerRotation);
    } else {
      let nextTargetZero = 100;

      for (let target = nextTargetZero; target <= dial + step; target += 100) {
        passByPerRotation++;
      }
      dial = (dial + step) % 100;

      logMessage(rotations[i], dial, passByPerRotation);
    }

    // if (dial == 0) {
    //   pointAtZero++;
    // }
    totalpassby += passByPerRotation;
    passByPerRotation = 0;
  }

  return totalpassby;
};

const logMessage1 = (rotation, dial, info) => {
  switch (info) {
    case 0:
      console.log(
        "The dial is rotated " + rotation + " to point at " + dial + "."
      );
      break;
    case 1:
      console.log(
        "The dial is rotated " +
          rotation +
          " to point at " +
          dial +
          "; during this rotation, it points at 0 once."
      );
      break;
    default:
      console.log(
        "The dial is rotated " +
          rotation +
          " to point at " +
          dial +
          `; during this rotation, it points at 0 ${info} times.`
      );
      break;
  }
};
const result = main(array);
console.log("The result is: " + result);

const main = (rotations) => {
  let dial = 50;
  let pointAtZero = 0;
  let passByPerRotation = 0;
  let totalpassby = 0;
  console.log("The dial starts by pointing at " + dial);

  for (let i = 0; i < rotations.length; i++) {
    let step = parseInt(rotations[i].slice(1));
    if (step == 0) {
      continue;
    }
    if (rotations[i][0] === "L") {
      if ((dial == 0 && step > 100) || dial != 0) {
        for (let j = dial - step; j < 0; j += 100) {
          passByPerRotation++;
        }
      }
      dial = dial - (step % 100);

      if (dial < 0) {
        dial = 100 + dial;
      }
      logMessage(rotations[i], dial, passByPerRotation);
    } else {
      if ((dial == 0 && step > 100) || dial != 0) {
        for (let k = dial + step; k > 100; k -= 100) {
          passByPerRotation++;
        }
      }
      dial = (dial + step) % 100;

      logMessage(rotations[i], dial, passByPerRotation);
    }

    if (dial == 0) {
      pointAtZero++;
    }
    totalpassby += passByPerRotation;
    passByPerRotation = 0;
  }

  return pointAtZero + totalpassby;
};

const logMessage = (rotation, dial, info) => {
  switch (info) {
    case 0:
      console.log(
        "The dial is rotated " + rotation + " to point at " + dial + "."
      );
      break;
    case 1:
      console.log(
        "The dial is rotated " +
          rotation +
          " to point at " +
          dial +
          "; during this rotation, it points at 0 once."
      );
      break;
    default:
      console.log(
        "The dial is rotated " +
          rotation +
          " to point at " +
          dial +
          `; during this rotation, it points at 0 ${info} times.`
      );
      break;
  }
};
// const result = main(array);
// console.log("The result is: " + result);
