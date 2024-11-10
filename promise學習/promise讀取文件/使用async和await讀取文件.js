const fs = require('fs');
const { promisify } = require('util');

async function main() {
    // 讀取文件
    let myreadFile = promisify(fs.readFile);
    try{
        let one = await myreadFile('./resource/1.txt');
        let two = await myreadFile('./resource/2.txt');
        let three = await myreadFile('./resource/3.txt');
        console.log(one + two + three);
    }catch(e){
        console.log(e);
    }
}

main();