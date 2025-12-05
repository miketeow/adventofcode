import fs from "node:fs";
import path from "node:path";

const inputPath = path.join(__dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

console.log(input);
