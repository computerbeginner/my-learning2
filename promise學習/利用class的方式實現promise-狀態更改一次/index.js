// 立即執行函數
// 好處: 可避免外部變量汙染
(function(window) {
    // 聲明promise類
    class Promise {
        // executor 表示執行器函數
        constructor(executor) {
            // 構造器中的this指向表示的是實例對象
            // 添加狀態
            this.PromiseState = 'pending';
            // 添加結果
            this.PromiseResult = undefined;

            // 定義resolve函數
            const _resolve = value => {
                // 如果實例對象狀態已經不是pending了，則不需要再更改
                if(this.PromiseState !== 'pending') return;
                this.PromiseState = 'fulfilled';
                this.PromiseResult = value;
            }

            // 定義reject函數
            const _reject = value => {
                // 如果實例對象狀態已經不是pending了，則不需要再更改
                if(this.PromiseState !== 'pending') return;
                this.PromiseState = 'rejected';
                this.PromiseResult = value;
            }

            try {
                // 調用執行器函數
                executor(_resolve, _reject);    
            } catch (err) {
                _reject(err);
            }
        }
    }
    window.Promise = Promise;
})(window);