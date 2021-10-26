//await

const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");

async function StockData() {
  // let stockCode = "0050";
  let today = moment().format("YYYYMMDD"); //自動給當天的日期
  let format = "json";

  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    console.log("stcokCode", stockCode);
    // 如果想要處理多個，split

    let res = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: format,
          date: today,
          stockNo: stockCode,
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}
StockData();
