const insertionSort = (arr) => {
  // The Insertion Sort algorithm uses one part of the array to hold the sorted values,
  // and the other part of the array to hold values that are not sorted yet.
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      } else {
        break;
      }
    }
  }
  return arr;
};

console.log(insertionSort([5, 3, 4, 1, 2]));
