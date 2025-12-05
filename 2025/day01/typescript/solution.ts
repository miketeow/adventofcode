import fs from "node:fs";
import path from "node:path";

const inputPath: string = path.join(__dirname, "../input.txt");
const input: string = fs.readFileSync(inputPath, "utf-8").trim();

console.log(input);
