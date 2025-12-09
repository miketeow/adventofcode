import fs from "node:fs";
import path from "node:path";

const inputPath = path.join(__dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const array = input.split("\n");

const solveBruteForce = (steps) => {
  let anchor = 50;
  let totalHits = 0;

  for (const line of steps) {
    const direction = line[0];
    const amount = parseInt(line.slice(1));

    // The "Dumb" Loop - Simulates every single click
    for (let click = 0; click < amount; click++) {
      if (direction === "R") {
        anchor++;
        if (anchor === 100) anchor = 0; // Wrap right
      } else {
        anchor--;
        if (anchor === -1) anchor = 99; // Wrap left
      }

      // The Golden Check: Did this specific click land on 0?
      if (anchor === 0) {
        totalHits++;
      }
    }
  }
  return totalHits;
};

const result = solveBruteForce(array);
console.log("The result is: " + result);
