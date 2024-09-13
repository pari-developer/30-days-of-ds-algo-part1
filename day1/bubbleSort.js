const bubbleSort = (arr) => {
  //In bubble sort after each iteration the largest number is placed to the end
  for (let i = arr.length; i >= 0; i--) {
    let swapped = false;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return arr;
};

console.log(bubbleSort([5, 2, 9, 1, 5, 6]));

//Time complexity - 0(n^2)
