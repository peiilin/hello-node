//middleware可以
// -自己寫
// -第三方
// -內建

const express = require("express");
const path = require("path");
require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

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

// express.static是middleware內建的中間件
app.use(express.static("static"));
// 可直接拿到 http://localhost:3001/about.html

// app.set 設定這個 application 的一些變數
// views: 告訴 app view 的檔案夾是誰
// view engine: 告訴app你用哪一個 view engine
app.set("views", "views");
app.set("view engine", "pug");

// 設定路由 route / router  --> 也算是一種中間件
// app.Mentod(Path, Handler)
// Mentod: GET, POST, PUT, DELETE, PATCH...
// Handler 是一個函式，會有兩個參數 request, response
app.get("/", (req, res, next) => {
  console.log("我是首頁1");
  // res.send("我是 Express 首頁");
  next();
});

app.get("/", (req, res) => {
  console.log("我是首頁2");
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res) => {
  res.send("我是會員頁");
});

app.get("/api/test", (req, res) => {
  res.json({
    name: "OOO",
    job: "XXX",
  });
});

app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
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
  connection.connect();
  console.log("express app start");
});
