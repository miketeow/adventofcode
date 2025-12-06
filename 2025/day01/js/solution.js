import fs from "node:fs";
import path from "node:path";

const inputPath = path.join(__dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const array = input.split("\n");

const main = (steps) => {
  let anchor = 50;
  let result = 0;

  for (let i = 0; i < steps.length; i++) {
    if (steps[i][0] === "L") {
      anchor = anchor - (parseInt(steps[i].slice(1)) % 100);
      if (anchor < 0) {
        anchor = 100 + anchor;
      }
    } else {
      anchor = (anchor + parseInt(steps[i].slice(1))) % 100;
    }

    if (anchor == 0) {
      result++;
    }
  }

  return result;
};
const result = main(array);
console.log("The result is: " + result);
