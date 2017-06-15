import "babel-polyfill";
import {conDataTool} from './mongodb'
import {eachLimit} from 'async';
import _ from 'lodash'
import {downImgByList} from './util/download'
import fs from 'fs'

const readdir = path => new Promise(function (resolve) {
    fs.readdir(path, function (err, dir) {
        resolve(dir);
    })
})

(async function () {
    try {
        let urlList = await conDataTool('imgs')(async col => {
            return col.find({isDown: 0}).toArray()
        })
        console.log('待下载: ' + urlList.length);
        urlList = urlList.slice(0, 2);
        await new Promise(function (resolve) {
            eachLimit(urlList, 3, async (e, callback) => {
                const dir = './images/';
                await downImgByList(e.data, e.title, dir);
                var files = await readdir(dir + e.title);
                if (files.length === e.data.length) {
                    await conDataTool('imgs')(async col => {
                        await col.updateOne({_id: e._id}, {$set: {isDown: 1}});
                    })
                    console.log(e.title + ': 下载完毕')
                }
                callback && callback();
            }, resolve)
        })

    } catch (err) {
        console.log(err);
    }
})();

