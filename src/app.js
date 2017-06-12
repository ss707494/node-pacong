

function doCasper(js='./src/casper/casperTest.js', url) {
    return new Promise(function (res) {
        var cp = require('child_process').spawn;
//exec可以像spawn一样使用
        var ls = cp('casperjs', ['./src/casper/casperTest.js', url]/*options, [optional]*/);
        ls.stdout.on('data', function (data) {
            res(data);
        });
        ls.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        ls.on('exit', function (code) {
            console.log('child process exited with code ' + code);
        });
    })
}

(async function () {
    var res = await Promise.all(['http://www.yac8.com/news/12317.html', 'http://www.yac8.com/news/7897.html'].map(e => doCasper('./src/casper/casperTest.js', e)));
    console.log(res.map(e => e.toString()));
})();
