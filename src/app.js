/**
 * Created by Administrator on 2017/6/2.
 */

var isDebug = 1;
var path = require('path')
var option = isDebug ? {
    openDevTools: {
        mode: 'detach'
    },
    show: true,
    executionTimeout: 300000000
} : {
    show: false
}
option.webPreferences = {
    preload:  path.resolve("lib/custom.js")
    // alternative: preload: "absolute/path/to/custom-script.js"
}
var Nightmare = require('nightmare');
var nightmare = Nightmare(option);

var url = 'http://www.yac8.com/news/13937.html'
nightmare
    .goto(url)
    .inject('js', './lib/jquery-3.2.1.min.js')
    .evaluate(function () {
        var res = $.map($('#newsContent img:not(.pointer)'), e => $(e).attr('src'))
        storeData('map', res);
    })
    .click('#__next')
    .wait(3000)
    .evaluate(function () {
        debugger
        var res = $.map($('#newsContent img:not(.pointer)'), e => $(e).attr('src'))
        storeData('msss', res)
    })
    .evaluate(function () {
        return getData__()
    })
    .end()
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    })
;

//
// try {
//     var Spooky = require('spooky');
//     debugger
// } catch (e) {
//     var Spooky = require('../lib/spooky');
// }
//
// var spooky = new Spooky({
//     child: {
//         transport: 'http'
//     },
//     casper: {
//         logLevel: 'debug',
//         verbose: true
//     }
// }, function (err) {
//     if (err) {
//         e = new Error('Failed to initialize SpookyJS');
//         e.details = err;
//         throw e;
//     }
//
//     spooky.start( 'http://www.yac8.com/news/13937_2.html');
//     spooky.then(function () {
//         this.emit('hello', 'Hello, from ' + this.evaluate(function () {
//                 return document.title;
//             }));
//     });
//     spooky.run();
// });
//
// spooky.on('error', function (e, stack) {
//     console.error(e);
//
//     if (stack) {
//         console.log(stack);
//     }
// });
//
// /*
//  // Uncomment this block to see all of the things Casper has to say.
//  // There are a lot.
//  // He has opinions.
//  spooky.on('console', function (line) {
//  console.log(line);
//  });
//  */
//
// spooky.on('hello', function (greeting) {
//     console.log(greeting);
// });
//
// spooky.on('log', function (log) {
//     if (log.space === 'remote') {
//         console.log(log.message.replace(/ \- .*/, ''));
//     }
// });

// const phantom = require('phantom');
// (async function() {
//     const instance = await phantom.create();
//     const page = await instance.createPage();
//
//     // const status = await page.open('http://www.yac8.com/news/13937_2.html');
//     const status = await page.open('http://www.baidu.com');
//     await page.includeJs('./lib/jquery-3.2.1.min.js')
//     var length = await page.evaluateAsync(function(){
//         var $a = $('a[name="tj_trhao123"]');
//         $a.trigger('click');
//         window.location.href = 'https://www.hao123.com/?tn=96635944_hao_pg';
//         return document;
//     });
//     console.log(status);
//     const content = await page.property('content');
//     console.log(content);
//     debugger
//
//     await page.render('baidu.jpg');
//
//     await instance.exit();
// }());

// var superagent = require('superagent');    //引入我们安装好的模块
// var request = require("request");
// var cheerio = require('cheerio');
// var fs = require('fs');                   //引入文件读取模块
//
// var urlData = ''
// async function getData(src, flag) {
//     //使用superagent请求url http://jandan.net/ooxx
//     superagent.get(src)
//         .end(function (err, docs) {
//             var $ = cheerio.load(docs.text);    //docs.text就是爬取到的数据，把它经过cheerio转换
//             var imgArr = [];
//             //$('.commentlist li .text p img')找到当前这页的所有图片元素,具体看下图hmtl结构就明白了
//             $('.commentlist li .text p img').each(function (idx, element) {
//                 var $el = $(element);
//                 imgArr.push($el.attr('src'));   //将图片的链接push到数组里
//             })
//             for (var i = 0; i < imgArr.length; i++) {
//                 var _url = imgArr[i].indexOf('http:') === -1 ? 'http:' + imgArr[i] : imgArr[i];
//                 // downloadImg(_url, imgArr[i].split('/')[4]);      //下载数组里的每张图片
//                 urlData += _url + ',';
//             }
//             if (flag) {
//                 fs.writeFile('./test.txt', urlData);
//                 // console.log(urlData);
//             }
//         })
// }
//
// var dir = './images';
// var downloadImg = function (url, filename) {
//     request.head(url, function (err, res, body) {
//         request(url).pipe(fs.createWriteStream(dir + "/" + filename));
//     });
// };
//
// const _genArr = (arr = []) => n => !n
//     ? arr : _genArr([n - 1, ...arr])(n - 1);
//
// const n = 90;
// // _genArr()(n).map((e,i) => getData('http://jandan.net/ooxx/page-' + e, e == n-1))
// // getData('http://jandan.net/ooxx/page-1');
