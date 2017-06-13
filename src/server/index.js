/**
 * Created by Administrator on 2017/6/13.
 */

import "babel-polyfill";
import Koa from 'koa'
import koaBody from 'koa-body'

function initServer(option={}) {
    const {port=3000} = option;

    const app = new Koa();

    app.use(koaBody());
    app.use(async function (ctx, next) {
        await next();
        console.log(`${ctx.method} ${ctx.url}`);
    });

    app.use(ctx => {
        if (ctx.method == 'POST') {
            if (ctx.originalUrl === '/downloadImg') {
                downloadImg(ctx.request.body);
            }
            if (ctx.originalUrl === '/handleUrls') {
                handleUrls(ctx.request.body);
            }
        }
    });

    app.listen(port);
}

import {downImgByList} from '../util/download'
//
function downloadImg(data) {
    console.log(JSON.stringify(data));
    if (!data.title || !data.data) {
        throw 'dataError:' + JSON.stringify(data);
    }
    downImgByList(JSON.parse(data.data), data.title, './images/', 5, function (res) {
        console.log(res);
    });
}

import {doCasper} from '../casper/index'
import {eachLimit} from 'async'

function handleUrls(data) {
    console.log(JSON.stringify(data));
    if (!data.data) {
        throw 'dataError:' + JSON.stringify(data);
    }
    eachLimit(JSON.parse(data.data), 5, (e, callback) => {
        doCasper('./babel/casper/casperTest.js', e, callback)
    }, err => {
        console.log(err);
        console.log('finish');
    })
}

export {
    initServer
}
