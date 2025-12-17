const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
};

const passBy = (right: boolean, current: number, steps: number) => {
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

export const solve = (rotations: string[]) => {
  let dial = 50;
  let totalPassby = 0;

  for (const rotation of rotations) {
    let passByZeroDial = 0;

    //safety check
    if (!rotation) continue;
    const steps = parseInt(rotation.slice(1));

    if (rotation[0] === "R") {
      passByZeroDial = passBy(true, dial, steps);
      dial = mod(dial + steps, 100);
    } else {
      passByZeroDial = passBy(false, dial, steps);
      dial = mod(dial - steps, 100);
    }

    totalPassby += passByZeroDial;
  }

  console.log(`The result is: ${totalPassby}`);
};
