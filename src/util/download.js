/**
 * Created by Administrator on 2017/6/13.
 */

var fs = require("fs");
var path = require('path');
var request = require('request');
var mkdirp = require('mkdirp');

//检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

const readdir = path => new Promise(function (resolve) {
    fs.readdir(path, function (err, dir) {
        resolve(dir);
    })
});

var downloadImage = function(src, dest, callback) {
    request({uri: src, encoding: 'binary'}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFile(dest, body, 'binary', function (err) {
                if (err) {console.log(err);}
                callback && callback(null, dest);
            });
        }
    });
};
var async_ = require('async')
const downImgByList = (urls, title, dir, limit = 5, callback = e =>{}) => {
    return new Promise(function (resolve) {
        async_.eachLimit(urls, limit, (e, callback) => {
            var path2 = dir+title;
            if (!fsExistsSync(path2)) {
                mkdirp(path2)
            }
            console.log((dir + e.slice(e.lastIndexOf('/') + 1)));
            downloadImage(e, dir + title + '/' + e.slice(e.lastIndexOf('/')+1), callback);
        }, resolve)
    })
}
export {
    fsExistsSync,
    readdir,
    downImgByList,
    downloadImage
}

