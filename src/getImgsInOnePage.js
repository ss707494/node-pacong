import "babel-polyfill";
import {doCasper, doCasperPromise} from './casper/index'
import {urls, imgs, conDataTool} from './mongodb'
import {eachLimit} from 'async';
import _ from 'lodash'

(async function () {
    try {
        const res = await urls.findOne();
        let url = res.data;
        var oldUrl = await conDataTool('imgs')(async collection => {
            const cursor = await collection.find().toArray();
            return cursor;
        });
        console.log('总数:' + url.length);
        console.log('旧的总数:' + oldUrl.length);

        var __url = {};

        url = _.filter(url, e => !_.some(oldUrl, old => {
            if(old.url === e && __url[e]) {
                console.log(e);
            }
            if (old.url === e) {
                __url[e] = 1;
            }
            return old.url === e
        }))
        console.log('过滤后:' + url.length);

        // return
        // url = url.slice(0, 30); // 一次查询一定个数
        url = url.slice(0, 40); // 一次查询一定个数
        console.log('需要查询的数据:' + url.length);
        if (Array.isArray(url)) {
            eachLimit(url, 2, async (e, callback) => {
                const res = await doCasperPromise('./babel/casper/getImgs.js', e)
                callback(res);
            })
        } else {
            console.log('数据格式错误');
        }
    } catch (err) {
        console.log(err);
    }
})();

