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

// cors 跨源請求
const cors = require("cors");
// let corsOprions = {
//   origin: "", //* 全部
// };
app.use(cors());

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

// app.use(PATH, express.static(檔案夾))
// express.static(檔案夾名稱) 是內建的中間件
app.use(express.static("static"));
// 1. 不指定路徑，從根目錄開始 http://localhost:3001/about.html
app.use("/static", express.static("static"));
// 2. 指定路徑 http://localhost:3001/static/about.html

// 例2-1.
app.use("/pug", express.static("pug-output"));
// 指定路徑 http://localhost:3001/pug/index.html

// app.set 設定這個 application 的一些變數
// views: 告訴 app view 的檔案夾是誰
// view engine: 告訴app你用哪一個 view engine
app.set("views", path.join(__dirname, "views"));
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
  // res.send("我是 Express 首頁");

  let data = {
    name: "pei",
    job: "fairy",
    cities: ["Kaohsiung", "Taichung"],
  };
  // 告訴 express 這個路由要用的樣板檔案是哪一個頁面需要 render
  res.render("index", data);
});

app.get("/member", (req, res) => {
  res.send("我是會員頁");
});

// 前端路由
// /member, /products, /register, /login
// 後端路由
// 建議加個 /api
app.get("/api/test", (req, res) => {
  res.json({
    name: "OOO",
    job: "XXX",
  });
});

// 列表:從sql上撈出全部資料
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

// /api/todos/24
// 根據 id 取得單筆資料
app.get("/api/todos/:todoId", async (req, res) => {
  // req.params.todoId  拿到變數
  let data = await connection.queryAsync("SELECT * FROM todos WHERE id = ?;", [
    req.params.todoId,
  ]);
  // 直接把陣列回給前端
  // res.json(data);
  if (data.length > 0) {
    res.json(data[0]);
  } else {
    // ? 空的
    // /api/todos/44
    // res.send(null);
    res.status(404).send("Not Found");
  }
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
