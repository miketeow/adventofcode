import fs from "node:fs";
import path from "node:path";
import { solveBruteForce } from "./02_brute_force";
import { solve } from "./01_solution";
import { solveRefactor } from "./03_ai_refactor";

const inputPath = path.join(__dirname, "../input/input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

// add regex split for cross-platform safety
const array = input.split(/\r?\n/);

solve(array);
solveBruteForce(array);
solveRefactor(array);
