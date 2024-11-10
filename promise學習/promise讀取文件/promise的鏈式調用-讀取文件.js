// 導入模塊
const fs = require('fs');
// 創建promise實例化對象
new Promise((resolve, reject) => {
    fs.readFile('./resource/1.txt', (err, data) => {
        if(err) reject(err);
        resolve(data);
    })
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./resource/2.txt', (err, data) => {
            if(err) reject(err);
                // 第一個檔案 第二個檔案 
            resolve([value, data]);
        })
    })
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./resource/3.txt', (err, data) => {
            if(err) reject(err);
            value.push(data);
            resolve(value);
        })
    })
}).then(value => {
    console.log(value.toString());
})