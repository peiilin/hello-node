function sum(param) {
  let j = 0;
  for (i = 1; i <= param; i++) {
    j = i + j;
  }
  return j;
}

console.log(sum(3));
console.log(sum(6));
console.log(sum(10));
