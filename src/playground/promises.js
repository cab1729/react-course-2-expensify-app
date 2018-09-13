const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'cab1729',
            age: 2000
        });
        //reject('Shit hit the fan!');
    }, 5000);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is my other promise');
        //reject('Shit hit the fan!');
    }, 5000);
});
}).then((str) => {
    console.log('does this run', str);
}).catch((error) => {
    console.log('error: ', error);
});

console.log('after');