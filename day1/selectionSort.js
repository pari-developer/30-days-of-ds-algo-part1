const selectionSort = (arr) => {
  ////In selection sort after each iteration the smallest number is placed at the start
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    let j;
    for (j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[min], arr[i]] = [arr[i], arr[min]];
    }
  }
  return arr;
};

console.log(selectionSort([18, 6, 19, 5, 0, 1]));

//Time complexity - 0(n^2)
