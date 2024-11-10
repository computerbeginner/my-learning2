// 導入模塊
const fs = require('fs');
// 封裝函數
function ReadFileFun(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

// 調用函數
ReadFileFun('./resource/2.txt').then(value => {
    console.log(value.toString());
}, reason => {
    console.log(reason);
})