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

let data = [
  { id: 1, title: "AAA", price: 100, count: 2 },
  { id: 4, title: "AAA", price: 200, count: 1 },
  { id: 6, title: "AAA", price: 300, count: 1 },
  { id: 1, title: "AAA", price: 500, count: 2 },
];
let result = data.reduce((acc, item) => acc + item.price * item.count, 0);

console.log(result);

//
console.log("start");

setTimeout(function () {
  console.log("Timeout");
}, 0);

console.log("after");
