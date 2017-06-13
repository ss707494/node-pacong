function doCasper(js = './src/casper/casperTest.js', url) {
    return new Promise(function (res) {
        var cp = require('child_process').exec;
//exec可以像spawn一样使用
        var ls = cp('casperjs '+ js + ' ' + url + ' -maxBuffer 1000*1024' /*options, [optional]*/);
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


// doCasper('./src/casper/getAllPageUrl.js', 'http://www.yac8.com/news/list_32.html').then(function (res) {
//     console.log(res.toString());
// })

var downImg = require('./util/download').default;

(async function () {
    try {
        var allPages = await allLimit(['http://www.yac8.com/news/list_32.html'], e => doCasper('./src/casper/getAllPageUrl.js', e), 5)
        var urls = JSON.parse(allPages.toString());
        console.log(urls);
        // var res = await Promise.all(['http://www.yac8.com/news/7897.html'].map(e => doCasper('./src/casper/casperTest.js', e)));
        var res = await allLimit(urls, e => doCasper('./src/casper/casperTest.js', e), 5, function (res) {
            console.log(res.toString());
            var e = JSON.parse(res.toString())
            debugger
            downImg.downImgByList(e.data, e.title, './images/', 5, function (res) {
                console.log(res);
            });
        });
        var imgList = res.map(e => JSON.parse(e.toString()));
        imgList.map(e => {
            console.log(JSON.stringify(e));
        })
    }catch (err) {
        console.log(err);
    }
});

(async function () {
    try {
        var urls = ['http://www.yac8.com/news/12980.html'];
        console.log(urls);
        // var res = await Promise.all(['http://www.yac8.com/news/7897.html'].map(e => doCasper('./src/casper/casperTest.js', e)));
        var res = await allLimit(urls, e => doCasper('./src/casper/casperTest.js', e), 5, function (res) {
            console.log(res.toString());
            var e = JSON.parse(res.toString())
            debugger
            downImg.downImgByList(e.data, e.title, './images/', 5, function (res) {
                console.log(res);
            });
        });
    }catch (err) {
        console.log(err);
    }
})();
