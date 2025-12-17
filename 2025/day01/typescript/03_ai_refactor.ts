type Direction = "R" | "L";

const mod = (n: number, m: number) => ((n % m) + m) % m;

// Simplified Logic: Continuous Coordinate System
// calculate the absolute change

const countPasses = (
  current: number,
  steps: number,
  direction: Direction
): number => {
  const delta = direction === "R" ? steps : -steps;
  const target = current + delta;
  // 50 will be 0, 150 will be 1
  const currentBlock = Math.floor(current / 100);
  const targetBlock = Math.floor(target / 100);

  return Math.abs(targetBlock - currentBlock);
};

export const solveRefactor = (rotations: string[]) => {
  let dial = 50;
  let totalPassby = 0;

  for (const rotation of rotations) {
    if (!rotation) continue;

    const direction = rotation[0] as Direction;
    const steps = parseInt(rotation.slice(1));

    totalPassby += countPasses(dial, steps, direction);

    // update dial position
    if (direction === "R") {
      dial = mod(dial + steps, 100);
    } else {
      dial = mod(dial - steps, 100);
    }
  }

  console.log(`The result is: ${totalPassby}`);
};
