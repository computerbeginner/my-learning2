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
            // 添加回調函數的數組
            this.callbackFn = [];

            // 定義resolve函數
            const _resolve = value => {
                // 如果實例對象狀態已經不是pending了，則不需要再更改
                if(this.PromiseState !== 'pending') return;
                this.PromiseState = 'fulfilled';
                this.PromiseResult = value;
                this.callbackFn.forEach(item => {
                    item.onfulfilled();
                })
            }

            // 定義reject函數
            const _reject = value => {
                // 如果實例對象狀態已經不是pending了，則不需要再更改
                if(this.PromiseState !== 'pending') return;
                this.PromiseState = 'rejected';
                this.PromiseResult = value;
                this.callbackFn.forEach(item => {
                    item.onrejected();
                })
            }

            try {
                // 調用執行器函數
                executor(_resolve, _reject);    
            } catch (err) {
                _reject(err);
            }
        }

        // 在類的原型身上添加then方法
        then(onfulfilled, onrejected) {
            // 第一: 用戶是否添加了成功回調和失敗回調，如沒有添加則需要設置默認值
            if(!(onfulfilled instanceof Functionon)) onfulfilled = value => value;
            if(!(onrejected instanceof Functionon)) onrejected = reason => { throw reason };

            // 第二: then方法的返回值為新的promise對象
            return new Promise((resolve, reject) => {
                // 封裝函數
                const _common = function(callback) {
                    setTimeout(() => {
                        try {
                            // 獲取不同回調函數(成功/失敗)中的結果
                            const value = callback(this.PromiseResult);
                            if(value instanceof Promise){
                                value.then(resolve, reject);
                            }else{
                                resolve(value);
                            }
                        } catch (err) {
                            reject(err);
                        }
                    })
                }

                // 判斷當下實例對象的狀態
                if(this.PromiseState === 'fulfilled') _common.call(this, onfulfilled);
                else if(this.PromiseState === 'rejected') _common.call(this, onrejected);
                else {
                    this.callbackFn.push({
                        onfulfilled: _common.bind(this, onfulfilled),
                        onrejected: _common.bind(this, onrejected),
                    })
                }
            })
        }
        // 在類的原型身上添加catch方法
        catch(onrejected) {
            return this.then(undefined, onrejected);
        }

        // 在promise類身上添加方法
        static resolve(value) {
            if(value instanceof Promise) {
                return value;
            }else {
                return new Promise(resolve => {
                    resolve(value);
                })
            }
        }
    }
    window.Promise = Promise;
})(window);