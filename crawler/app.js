// promise版

const axios = require('axios');

let stockCode = "0050";
let today = "20211017"
let format = "json";

// 舊方法
// "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=" + format + "&date=" + today + "&stockNo=" + stockCode
// `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=${format}&date=${today}&stockNo=${stockCode}`

axios
.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
    params: {
        response: format,
        date: today,
        stockNo: stockCode,
      },
})
.then((res)=>{
    console.log(res.data);
})
.catch((e)=>{
    console.error("錯誤", e);
})
