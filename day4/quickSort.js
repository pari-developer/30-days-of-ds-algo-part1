//helper function to find the pivotIndex.
const pivotHelper = (arr, start = 0, end = arr.length - 1) => {
  let pivot = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
  return swapIdx;
};

// main function
const quickSort = (arr, start = 0, end = arr.length - 1) => {
  if (start < end) {
    let pivot = pivotHelper(arr, start, end);
    quickSort(arr, start, pivot - 1);
    quickSort(arr, pivot + 1, end);
  }
  return arr;
};

console.log(quickSort([5, 3, 4, 1, 2]));

//Time complexity - 0(nlogn)
