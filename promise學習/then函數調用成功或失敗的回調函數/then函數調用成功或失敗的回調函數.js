// 立即執行函數(IIFE)
// 好處是可避免外部變量汙染
(function(window) {
    function Promise(executor) {
        // 給promise構造函數所產生的實例對象加屬性
        this.PromiseState = 'pending';
        this.PromiseResult = undefined;
        // 方法1.保存想要的函數中this指向，在需要的函數直接使用即可
        // let _this = this;

        /*
            函數中this指向取決於函數的調用者，誰調用，this就指向誰
            函數中不光可以得到另一個函數中的this指向(如方法一)，還可以修改this指向
            修改this指向的方法有3種:
                call、apply、bind
            call和apply的差別: 實際參數傳遞的格式不同
            xxx.call(新的this指向，實參1，實參2);
            xxx.apply(新的this指向，[實參1，實參2]);
            call和apply的共同點，在於函數一修改完this指向後，函數立即執行

            call和bind之間的區別，call會立即執行，bind不會，且bind只有返回值，
            且返回的是和原函數結構一樣的修改完this指向的新函數
        */

        // 定義resolve函數
        // 箭頭函數沒有自己的this指向，取決於當前函數聲明位置的this指向(外層函數的this指向)
        const _resolve = value => {
            // 判斷當前狀態不是pending，就代表已更改過一次，所以就不再更改了
            if(this.PromiseState !== 'pending') return;
            this.PromiseState = 'fulfilled';
            this.PromiseResult = value;
        };

        // 定義reject函數
        const _reject = value => {
            if(this.PromiseState !== 'pending') return;
            this.PromiseState = 'rejected';
            this.PromiseResult = value;
        };

        try {
            executor(_resolve, _reject);
            executor(_resolve, _reject);
        } catch (e) {
            if(e === 'object'){
                this.PromiseState = 'rejected';
                this.PromiseResult = e.message;
            }else{
                this.PromiseState = 'rejected';
                this.PromiseResult = e; 
            }
        }
    }
    // 藉助於Object.assign方法使用一個對象和prototype對象進行合併
    Object.assign(Promise.prototype, {
        // ES6方法的簡寫
        // onfulfilled:成功的回調
        // onrejected:失敗的回調
        // 方法中的this指向取決於方法的調用者
        then(onfulfilled, onrejected) {
            // console.log('實例化對象', this);
            // 調用then方法得到一個返回值，為新的promise實例對象
            return new Promise((resolve, reject) => {

                // 判斷
                if(this.PromiseState === 'fulfilled'){
                    // 成功的回調
                    // 如果想要讓成功的回調函數慢於同步執行代碼(console.log('over...');)，
                    // 只需要調用定時器即可，也就是異步
                    setTimeout(() => {
                        onfulfilled(this.PromiseResult);
                    })
                }else if(this.PromiseState === 'rejected'){
                    // 失敗的回調
                    // 如果想要讓回調函數慢於同步執行代碼(console.log('over...');)，
                    // 只需要調用定時器即可，也就是異步
                    setTimeout(() => {
                        onrejected(this.PromiseResult);
                    })
                }
            })
        }
    });
    window.Promise = Promise;
})(window);