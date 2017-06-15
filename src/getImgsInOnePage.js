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
        url = _.filter(url, e => !_.some(oldUrl, old => old.url === e))
        url = url.slice(0, 45); // 一次查询一定个数
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

