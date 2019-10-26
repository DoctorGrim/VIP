/* 
takes an array, a target sum, and a type and will then output all of the pairs that sum up to the target. 

the Types are:
'all': output all pairs (includes duplicates and the reversed ordered pairs)

'unique': output unique pairs only once (removes the duplicates but includes 
 the reversed ordered pairs)

'noDuplicates': output the same combo pair only once(removes the reversed ordered pairs)*/

let array = [1, 1, 2, 4, 4, 5, 5, 5, 6, 7, 9,];


const largePairsDuplicates = (array, target, type) => {
  //using .slice() here prevents mutation
  let newArray = array.slice().sort((a, b) => a - b);
  let lowIndex = 0;
  let highIndex = newArray.length - 1;
  let pairs = [];

  while (lowIndex < highIndex) {
    let pair = [newArray[lowIndex], newArray[highIndex]];
    let sum = pair.reduce((a, b) => a + b);

    if (sum < target) {
      lowIndex += 1;

    } else if (sum > target) {
      highIndex -= 1;

    } else {
      /*by using the difference in the starting index and the current index, the number of times a number combination 
        appears is found. we can then add that same pair to the array that many times.*/
      let currentLow = newArray[lowIndex];
      let startingLowIndex = lowIndex;

      while (lowIndex < highIndex && newArray[lowIndex] == currentLow) {
        lowIndex += 1;
      }
      let currentHigh = newArray[highIndex];
      let startingHighIndex = highIndex;

      while (lowIndex <= highIndex && newArray[highIndex] == currentHigh) {
        highIndex -= 1;
      }
      if (type == "noDuplicates") {
        pairs.push([newArray[startingLowIndex], newArray[startingHighIndex]]);

      } else if (currentLow == currentHigh) {
        /* for pairs with both numbers the same number you must 
        add additional pairs as each repeated number that is passed by also matches with all of the others. 
        I was not able figure out how to get the correct amount of [5,5]'s on my own and needed to look up to find (deltaX+deltaY-1)*(deltaX+deltaY)/2*/
        let temp =
          lowIndex - startingLowIndex + startingHighIndex - highIndex - 1;
        let numberOfPairs = (temp * (temp + 1)) / 2;

        for (let index = 0; index < numberOfPairs; index++) {
          pairs.push([newArray[startingLowIndex], newArray[startingHighIndex]]);
        }

      } else {
        for (
          let index = 0;
          index <
          (lowIndex - startingLowIndex) * (startingHighIndex - highIndex);
          index++
        ) {
          pairs.push([newArray[startingLowIndex], newArray[startingHighIndex]]);
        }
      }
    }
  }
  //mirrors array
  if (type == "all" || type == "unique") {
    let firstHalf = pairs;
    let secondHalf = firstHalf.slice().reverse();
    let allPairs = [
      ...firstHalf,
      ...secondHalf.map(sub => sub.slice().reverse())
    ];
    //removes all duplicates. originally i just mirrored "noDuplicates" but i would need to get rid of the extra [5,5] anyway so moved it here 
    // Set doesn't work with arrays inside of an array so it needed to be converted first.
    if (type == "unique") {
      let JSONArray = new Set(allPairs.map(JSON.stringify));
      let uniqueArray = Array.from(JSONArray).map(JSON.parse);
      return uniqueArray;
      
    } else {
      return allPairs;
    }
  }
  return pairs;
};

console.log(largePairsDuplicates(array, 10, "all"));

console.log(largePairsDuplicates(array, 10, "unique"));

console.log(largePairsDuplicates(array, 10, "noDuplicates"));
