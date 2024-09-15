function mergeArrays(arr1, arr2) {
  let i = 0;
  let j = 0;
  let results = [];
  while (arr1.length && arr2.length) {
    if (arr[i] > arr[j]) {
      results.push(arr[j]);
      j++;
    } else {
      results.push(arr[i]);
      i++;
    }
  }
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[i]);
    j++;
  }
  return results;
}

export const mergeSort = (arr) => {
  // the process of merge sort is to divide the array into two halves, sort each half,
  //  and then merge the sorted halves back together.
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return mergeArrays(left, right);
};
console.log(mergeSort([24, 10, 76, 73]));


//Time complexity - 0(nlogn)