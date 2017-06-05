/**
 * Created by Administrator on 2017/6/2.
 */

var superagent = require('superagent');    //引入我们安装好的模块
var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');                   //引入文件读取模块

var urlData = ''
function getData(src) {
    //使用superagent请求url http://jandan.net/ooxx
    superagent.get(src)
        .end(function(err,docs){
            var $ = cheerio.load(docs.text);    //docs.text就是爬取到的数据，把它经过cheerio转换
            var imgArr = [];
            //$('.commentlist li .text p img')找到当前这页的所有图片元素,具体看下图hmtl结构就明白了
            $('.commentlist li .text p img').each(function(idx, element){
                var $el = $(element);
                imgArr.push($el.attr('src'));   //将图片的链接push到数组里
            })
            for(var i=0; i<imgArr.length; i++){
                var _url = imgArr[i].indexOf('http:') === -1 ? 'http:' + imgArr[i] : imgArr[i];
                // downloadImg(_url, imgArr[i].split('/')[4]);      //下载数组里的每张图片
                urlData += _url + '\t';
            }
        })
}

var dir = './images';
var downloadImg = function(url, filename){
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};

const _genArr = (arr = []) => n => !n
    ? arr : _genArr([n - 1, ...arr])(n - 1);

_genArr()(20).map(e => getData('http://jandan.net/ooxx/page-' + e))
// getData('http://jandan.net/ooxx/page-1');
