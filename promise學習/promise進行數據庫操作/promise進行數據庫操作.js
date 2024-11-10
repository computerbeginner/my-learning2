// 導入模塊
const mongoose = require('mongoose');
// 創建promise實例化對象
new Promise((reslove, reject) => {
    // 鏈接資料庫
    mongoose.connect('mongodb://127.0.0.1:27017/project1');
    mongoose.connection.on('open', ()=> {
        // 連接成功的情況
        reslove();
    })
    mongoose.connection.on('error', () => {
        // 連接失敗的情況
        reject();
    })
}).then(value => {
    // 創建結構
    const noteSchema = new mongoose.Schema({
        title:String,
        content:String
    })

    // 創建模型
    const nodeModel = mongoose.model('notes', noteSchema);
    // 讀取操作
    nodeModel.find().then(value => {
        console.log(value);
    }, reason => {
        console.log(reason);
    })
}, reason => {
    console.log('數據庫連接失敗');
})