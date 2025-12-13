import fs from "node:fs";
import path from "node:path";
const sampleInputPath = path.join(__dirname, "../sampleinput.txt");
const sampleInput = fs.readFileSync(sampleInputPath, "utf-8").trim();
const testInputPath = path.join(__dirname, "../testinput.txt");
// const testInputPath = path.join(import.meta.dirname, "../testinput.txt");
const testInput = fs.readFileSync(testInputPath, "utf-8").trim();
const testArray = testInput.split("\n");
const inputPath = path.join(__dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();
const sampleArray = sampleInput.split("\n");
const array = input.split("\n");

const convertNum = (num) => Number(num);
function partOne(inputArray) {
  let firstIndex = 0;
  let firstNum = 0;
  let firstDigit = "";
  let secondDigit = "";
  let result = "";
  let totalJolt = 0;
  let secondDigitsArr = [];
  let numArray = inputArray.map((num) => BigInt(num));

  // console.log(numArray);

  for (let i = 0; i < numArray.length; i++) {
    let digitsArr = Array.from(String(numArray[i]), convertNum);
    // console.log(digitsArr);
    let digitsSet = new Set(digitsArr);
    firstNum = Math.max(...digitsSet);
    firstDigit = String(firstNum);
    // console.log(`first digit is ${firstDigit}`);

    // edge case where largest number is at last position in the line, then I have to find the second largest to the left
    // and first number would become second

    for (let j = 0; j < digitsArr.length; j++) {
      if (digitsArr[j] == firstNum) {
        firstIndex = j;

        if (firstIndex == digitsArr.length - 1) {
          // handle edge case
          // console.log("This is edge case");
          secondDigitsArr = digitsArr.slice(0, firstIndex);
          // console.log(`second digit arr is now ${secondDigitsArr}`);
          let secondDigitsSet = new Set(secondDigitsArr);
          secondDigit = String(Math.max(...secondDigitsSet));

          result = secondDigit + firstDigit;
        } else {
          // console.log(`first index is ${firstIndex}`);

          secondDigitsArr = digitsArr.slice(firstIndex + 1);
          // console.log(`second part of the arr is ${secondDigitsArr}`);

          let secondDigitsSet = new Set(secondDigitsArr);
          secondDigit = String(Math.max(...secondDigitsSet));
          result = firstDigit + secondDigit;
        }
        // console.log(`result is ${result}`);
        break;
      }
    }
    totalJolt += Number(result);
  }

  console.log(`The total jolt is ${totalJolt}`);
}

// partOne(array);

function partTwoOld(inputArray) {
  let currentNum = 0;
  let currentDigit = "";
  let result = "";
  let currentLargestIndex = 0;
  let indexSet = new Set();
  let newDigit = 0;
  let leftDigit = 0;
  let rightDigit = 0;
  let resultArr = [];
  let totalJolt = 0;
  let newDigitsArr = [];
  let leftDigitsArr = [];
  let rightDigitsArr = [];
  let numArray = inputArray.map((num) => BigInt(num));

  for (let i = 0; i < numArray.length; i++) {
    // 1. Get the first largest number
    let digitsArr = Array.from(String(numArray[i]), convertNum);
    let endRange = digitsArr.length;
    let digitsSet = new Set(digitsArr);
    currentNum = Math.max(...digitsSet);
    currentDigit = String(currentNum);
    resultArr.push(currentDigit);

    console.log(`The iteration is now ${i}`);
    console.log(`The currentNum is now ${currentNum}`);
    console.log(`The current largest index is set to ${currentLargestIndex}`);

    console.log(`The resulr arr is now: ${resultArr} --- 1`);

    // The start cannot always be 0, the condition cannot be less than the full length, it will be dynamic
    // I suspect it is going to be dynamic at first, but after walking through some test case, it seems like only the starting condition can be moved so that in some iteration, we son't have to loop through from the start again, but for the ending condition, it seems like there is no effective way to determine the suitable new position, it is likely has to be always remain as the arr.length
    for (let j = currentLargestIndex; j < endRange; j++) {
      console.log(`j is now ${currentLargestIndex}`);
      console.log(`The end condition is set to ${endRange}`);

      // 2. Get the current largest index
      if (digitsArr[j] == currentNum) {
        // 21. If matched the index, first check if it is already in the record, if no, add into the record, else continue the loop into next iteration
        if (indexSet.has(j)) {
          console.log("skip to next iteration ---- 2");

          continue;
        } else {
          currentLargestIndex = j;
          indexSet.add(j);
          console.log(`add ${j} into index set ---- 3`);
        }

        // 3. If there are still more 12 position to the right
        if (currentLargestIndex + 12 <= digitsArr.length) {
          // 4. Get new slice of array from current largest index to the end
          console.log(`before slicing the cli is ${currentLargestIndex} --- 4`);

          newDigitsArr = digitsArr.slice(currentLargestIndex + 1);

          console.log(`the newDigitsArr is : ${newDigitsArr} --- 5`);

          // console.log(`the new slice arr is now ${newDigitsArr}`);
          // 5. Create new set, find the largest number from this new set.
          let newDigitsSet = new Set(newDigitsArr);
          newDigit = String(Math.max(...newDigitsSet));

          console.log(`The new digit is ${newDigit} --- 6`);

          // 6. This is the right side of previous number, so insert into the right side

          resultArr.push(newDigit);

          console.log(`The resultArr looks like ${resultArr} --- 7`);

          // 7. Set the current num as this new digit
          currentNum = Number(newDigit);

          console.log(`The currentNum is ${currentNum} --- 8`);

          // 8. In the current iteration, at this point, I can safely ignore any number that is at the left side of the latest current number.Because coming into this condition means that the latest current number is the most significant digit. So for the next iteration, the loop can start from the current largest index to the end. So there is no update to both the starting point of the loop - the currentLargestIndex and the ending point of the loop - the endRange.
          /*
          20. Now there is still cases that is not properly handle for example 16387 9 22349955, where there are multiple same number. This is a very likely cases because the input length is more than 20 an it can only be digits 1 to 9, there will be many repeated digit. The current function will detect the leftmost digit regardless of how many repeated digits are there, this is fine, but the thing is we need some way to make sure the second iteration of this function catch this 1638792234 9 955, instead of the same 9 in the same index again 16387 9 22349955. One way I can think of right now is to also keep track of the index position as well, since it will be all unique. A set can probably work since it is all expected to be unique.
          */
        } else {
          // There is edge case where [...very long ... 9 ... { less than 12 space .. but the number 8 is here ...}]
          // 8. If there are less than 12 position to the right
          // 9. Get two new slices of array, one from start to the currentLargestIndex

          console.log("now there are less space on the right --- 9");

          leftDigitsArr = digitsArr.slice(0, currentLargestIndex);
          let leftDigitsSet = new Set(leftDigitsArr);
          leftDigit = String(Math.max(...leftDigitsSet));

          console.log(`left digits array is ${leftDigitsArr} --- 10`);
          console.log(
            `The max number in left digit arr is ${leftDigit} --- 11`
          );

          // 10. And another array from the current largest index to the end if the current largest index is not the end itself.

          console.log(`currentLargestIndex is ${currentLargestIndex} --- 12`);
          console.log(`digit arr length - 1 is ${digitsArr.length - 1} --- 13`);

          if (currentLargestIndex < digitsArr.length - 1) {
            console.log("It is likely for this case to get here --- 14");

            rightDigitsArr = digitsArr.slice(currentLargestIndex);
            let rightDigitSet = new Set(rightDigitsArr);
            rightDigit = String(Math.max(...rightDigitSet));

            console.log(`the right side arr is ${rightDigitsArr} --- 15`);
            console.log(
              `the max number in right side arr is ${rightDigit} --- 16`
            );
          }

          // 11. Compare left digit and right digit if right digit is larger than 0
          if (rightDigit >= 0) {
            // 12. Choose the largest number between left and right, if equal, choose left
            // HERE ARE EXPERIMENT -------------------------------------- assuming if it reach here we need to check if

            console.log(`right digit is ${rightDigit} --- 17`);

            if (leftDigit >= rightDigit) {
              // 13. Because it is at the left side, put it in front of the result arr
              resultArr = [leftDigit, ...resultArr];

              console.log(`The result arr is now: ${resultArr} --- 18`);

              // 14. Set the current number as this new left digit
              currentNum = Number(leftDigit);

              console.log(
                `The currentNum is set to ${currentNum} at the end --- 19`
              );

              // For the next iteration, the loop can start from the starting point of 0 until the currentLargestIndex
              // In the case of 1673338744 9 2255: the current available info is:
              // currentNum = 8
              // currentLargestIndex = 10
              // It might seems like it is a good idea to get the index of this number 8 , update the start range variable and end range variable for the outer for loop and then start the next iteration with these pair of new variable,
              // but we actually don't need extra for loop or find the index now, because once we go pass this condition, the loop continue, and we can simply set the endRange to currentLargestIndex, and then set currentLargestIndex to 0, the code keep going, looping back to the for loop condition, which is
              // for (let j = currentLargestIndex = 0; j < endRange = 10; j ++)
              // if(digitArr[j] == 8){
              //  currentLargestIndex = j (which would be 6 in this case)
              // }
              /*
              but updating new endRange is actually unessecary because here we know that the number is somewhere in the left side, even though I set the endrange to this new position to make it seems like we are looping less iteration, since we are defining a smaller range, but technically it will definitely hit the condition, find the value before reaching this endRange. But here it will likely cause an issue in later iteration, even though for the current iteration, in this condition, we determine that the next largest number is in front.Since we move up or move left the endRange, there is no way we could know that if on future iteration, the 5th or 6th largest number might be placed after this endRange [[...next largest number...endRange]...[...more digits...5th or 6th largest number]. If we keep this line of code, there must be somewhere else that need to move this endRange back to the actual end = arr.length, but to avoid this redundant and potentially breaking code, it is best to simply remove it.
              */
              // endRange = currentLargestIndex;

              // among all the possible condition, where
              // a. [... current largest number ... more than 12 positions...next largest number]
              // b. [... current largest number ... [...less than 12 positions... next largest number]]
              // c. [... next largest number ... current largest number ... [...less than 12 positions...]], this is the only one where I need to reset the currentLargestIndex back to 0. Looking at the case of 1673338744 9 2255, the next largest number might be in front.
              j = 0;
            } else {
              // 15. The next largest number is at the right side, so put it at the end
              resultArr.push(rightDigit);
              // 16. Set the current number as this new right digit
              currentNum = Number(rightDigit);

              // In the case of 1673336544 9 28552: the current available info is:
              // currentNum = 8
              // currentLargestIndex = 10
              // endRange = arr.length
              /*
              At this point we know two information, which is we are cramped in the 12th last space here, the next biggest number (7) might near the beginning, or it could be even at the end, but remember that the first step of next iteration is to found the index of the currentNum. Since this condition means the previous number is in the middle of somewhere, the currentNum which is the largest at the moment is within the 12 position neasr the right, but we dunno the exact index yet. So right after the start of the next iteration, we are going to find this index, but should we start from 0 again ? no since we already know that this is somewhere in the rightmost side, thus keep the currentLargestIndex, let the next iteration start somewhere in the middle.
              As for the end range, the test case might be 1663336544 9 28572, we already find the 9 and 8 at this point, next is the 7, so it does not make sense to update the endRange to other position, we have no way to know how much should we move the endRange.
              */
            }
          }
        }

        // console.log(`resultArr is ${resultArr}`);
        // 18. Check if result arr length is 12, if yes break the loop
        if (resultArr.length == 12) {
          console.log("should not come");

          break;
        }
        console.log("reach here ? ---- 20");
      }
      console.log(`right before looping, j is ${j}`);

      console.log("reach here ? ---- 21");
    }

    totalJolt += Number(result);
  }

  console.log(`The total jolt is ${totalJolt}`);
}

// partTwo(testArray);

function partTwo(banks) {
  let joltPerBank = [];
  let totalJolt = 0;
  let start = 0;
  let end = 0;
  let limit = 0;
  let batterySize = 12;
  let msd = 0;
  let msdIndex = 0;
  let banksArray = banks.map((num) => BigInt(num));

  for (let i = 0; i < banksArray.length; i++) {
    let bank = Array.from(String(banksArray[i]), convertNum);
    // console.log(`The bank is ${bank}`);
    // console.log(`bank length is ${bank.length}`);

    limit = bank.length - batterySize;
    joltPerBank = [];
    start = 0;

    while (joltPerBank.length < batterySize) {
      for (let j = start; j <= limit; j++) {
        if (bank[j] > msd) {
          msd = bank[j];
          msdIndex = j;
        }
      }
      joltPerBank.push(msd);
      msd = 0;

      if (limit < bank.length) {
        limit++;
        start = msdIndex + 1;
      }
    }

    totalJolt += parseInt(joltPerBank.join(""));
  }

  console.log(`The total jolt is ${totalJolt}`);
}

partTwo(array);
