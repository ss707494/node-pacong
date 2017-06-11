/**
 * Created by Administrator on 2017/6/2.
 */

// try {
//     var Spooky = require('spooky');
//     debugger
// } catch (e) {
//     var Spooky = require('../lib/spooky');
// }

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
//     spooky.start();
    // spooky.open('https://www.google.com/search?newwindow=1&q=%E7%94%B5%E5%BD%B1+%E7%BB%8F%E5%85%B8+%E6%BC%94%E8%AE%B2&oq=%E7%94%B5%E5%BD%B1+%E7%BB%8F%E5%85%B8+%E6%BC%94%E8%AE%B2&gs_l=serp.3...11390.11390.0.11817.1.1.0.0.0.0.197.197.0j1.1.0....0...1.1.64.serp..0.0.0.dmwLryJW2HA');
    // spooky.then(function () {
    //     this.emit('data', 'Hello, from ' + this.evaluate(function () {
    //             return document.title;
    //         }));
    // })
    // spooky.thenClick('#ires a', function () {
    //     this.emit('data', 'Hello, from ' + this.evaluate(function () {
    //             return document.title;
    //         }));
    // });
//     spooky.thenOpen('https://www.zhihu.com/question/20262017', function () {
//         this.emit('data', this.evaluate(function () {
//                 return document.title;
//             }));
//     })
//     spooky.run();
// });

// spooky.on('error', function (e, stack) {
//     console.error(e);
//
//     if (stack) {
//         console.log(stack);
//     }
// });
//
// spooky.on('data', function (log) {
//     console.log(log);
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
var request = require("request");
// var cheerio = require('cheerio');
var fs = require('fs');                   //引入文件读取模块
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
