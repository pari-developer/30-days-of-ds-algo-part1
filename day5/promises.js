// Promise implementation
class myPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new myPromise((resolve, reject) => {
      const onFulfilledHandler = () => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(this.value);
            if (result instanceof myPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            resolve(this.value);
          }
        } catch (error) {
          reject(error);
        }
      };

      const onRejectedHandler = () => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(this.reason);
            if (result instanceof myPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            reject(this.reason);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'fulfilled') {
        setTimeout(onFulfilledHandler, 0);
      } else if (this.state === 'rejected') {
        setTimeout(onRejectedHandler, 0);
      } else {
        this.onFulfilledCallbacks.push(() => setTimeout(onFulfilledHandler, 0));
        this.onRejectedCallbacks.push(() => setTimeout(onRejectedHandler, 0));
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

//lets try to test the new promise created by us

// const promise = new myPromise((resolver,reject)=>{
//     resolver('I am testing the happy case . Dont worry am resolved')
// })
// promise.then((value)=>{
//   console.log(value)
// })

// ------------------------ lets not pass any callback function and test
// const promise1 = new myPromise((resolver) => {
//   resolver('No callback! Yet am working');
// });
// promise1.then().then((value) => {
//   console.log(value);
// });

// ------------------------ lets return a nested promise
// const promise2 = new myPromise((resolve, reject) => {
//   return new myPromise((res, rej) => {
//     res(' I am a promise inside a promise and am resolved now');
//   }).then(resolve);
// });

// promise2.then().then((value) => {
//   console.log(value);
// });

// ------------------------ lets check the rejected promise

// const promise3 = new myPromise((resolve, reject) => {
//   new myPromise((res, rej) => {
//     rej('I am rejecting');
//   })
//     .then(resolve)
//     .catch(reject);
// });

// promise3
//   .then()
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((reason) => {
//     console.log(reason);
//   });

// Promise all implementation
myPromise.prototype.promiseAll = function (promises) {
  return new myPromise((resolve, reject) => {
    let resolvedPromises = [];
    let completedPromises = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises
      .forEach((promise, index) => {
        myPromise.resolve(promise).then((data) => {
          resolvedPromises[index] = data;
          completedPromises++;
        });
        if (promises.length === completedPromises.length) {
          resolve(resolvedPromises);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Promise.race implementation
myPromise.prototype.promiseRace = (promises) => {
  return new myPromise((resolve, reject) => {
    promises.forEach((promise) => {
      myPromise.resolve(promise).then(resolve).catch(reject);
    });
  });
};
