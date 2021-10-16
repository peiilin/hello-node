//promise
const fs = require("fs");

function readFilePromise(){
    return new Promise((resolve, reject)=>{
        fs.readFile("input.txt", "utf-8",(err, data)=>{
            if(err) {
                reject(err);
            }else{
                resolve(data);
            }
        });
    })
}

// 回傳-物件.then.catch
p = readFilePromise();
p.then ((data)=>{
    console.log("成功", data);
})
p.catch ((err)=>{
    console.error(err);
})



// callback
// fs.readFile("input.txt", "utf-8", (err, data) => {
//     if (err){
//         console.error("發生錯誤囉", err);
//     }else{
//         console.log("拿到資料:", data);
//     }
// } )