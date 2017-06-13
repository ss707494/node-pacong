/**
 * Created by Administrator on 2017/6/13.
 */

function doCasper(js='./bable/casper/casperTest.js', url, callback) {
    var cp = require('child_process').spawn;
//exec可以像spawn一样使用
    var ls = cp('casperjs', [js, url]/*options, [optional]*/);
    ls.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    ls.on('exit', function (code) {
        callback && callback(code);
        // console.log('child process exited with code ' + code);
    });
}

export {doCasper}
