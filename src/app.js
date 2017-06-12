

function doCasper(js='./src/casper/casperTest.js', url) {
    return new Promise(function (res) {
        var cp = require('child_process').spawn;
//exec可以像spawn一样使用
        var ls = cp('casperjs', [js, url]/*options, [optional]*/);
        ls.stdout.on('data', function (data) {
            res(data);
        });
        ls.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        ls.on('exit', function (code) {
            // console.log('child process exited with code ' + code);
        });
    })
}

const allLimit = function(arr, wrap, limit, callback) {
    return new Promise((resolve, reject) => {
        var total = arr.length;
        var result = new Array(total);
        var rejected = false;
        var dones = 0;
        function run(n) {
            setTimeout(() => {
                wrap(arr.shift()).then(res => {
                    return typeof callback === 'function' ? callback(res) : Promise.resolve(res);
                }).then(res => {
                    dones++;
                    result[n] = res;
                    if (!rejected) {
                        if (arr.length) {
                            run(total - arr.length);
                        } else if (dones === total) {
                            resolve(result);
                        }
                    }
                }).catch(err => {
                    rejected = true;
                    reject(err);
                });
            }, 0);
        }
        arr.slice(0, limit).forEach((v, n) => {
            run(n);
        });
    });
};

// doCasper('./src/casper/getAllPageUrl.js', 'http://www.yac8.com/news/list_32.html').then(function (res) {
//     console.log(res.toString());
// })

(async function() {
    // var res = await Promise.all(['http://www.yac8.com/news/12317.html', 'http://www.yac8.com/news/7897.html'].map(e => doCasper('./src/casper/casperTest.js', e)));
    // var res = await allLimit(['http://www.yac8.com/news/12317.html', 'http://www.yac8.com/news/7897.html'], e => doCasper('./src/casper/casperTest.js', e), 5);
    var res = await allLimit(['http://www.yac8.com/news/list_32.html'], e=> doCasper('./src/casper/getAllPageUrl.js', e), 5)
    var message = res.map(e => e.toString());
    debugger
    console.log(message);
})();

