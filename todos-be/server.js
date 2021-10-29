const express = require("express");

let app = express(); //application

// app.use 告訴 express 有個中間件(middleware)
// middleware 只是一個函式，會有三個參數
app.use((req, res, next) => {
  console.log("我是 AAA 中間件");
  // 如果沒有next();就會停在中間件這

  next();
  // next()可以讓他往下一步驟前進
  // 但是目前這個中間件「不需要」知道下一個是誰
});

app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來訪問 at ${current.toISOString()}`);
  next();
  //要寫next()才會接下一個步驟
});

// 設定路由 route / router  --> 也算是一種中間件
// app.Mentod(Path, Handler)
// Mentod: GET, POST, PUT, DELETE, PATCH...
// Handler 是一個函式，會有兩個參數 request, response
app.get("/", (req, res, next) => {
  console.log("我是首頁1");
  //   res.send("我是 Express 首頁");
  next();
});

app.get("/", (req, res) => {
  console.log("我是首頁2");
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res) => {
  res.send("我是會員頁");
});

// 負責做紀錄的中間件
app.use((req, res, next) => {
  console.log(`${req.url} 找不到路由`);
  next();
});

// 前面的所有路由中間件 PATH 都比不到
// 就會走到這個中間件
// 404網頁
app.use((req, res, next) => {
  console.log("我是路由後面的中間件");
  res.status(404).send("NOT FOUND");
});

// port 3301
app.listen(3001, () => {
  console.log("express app start");
});
