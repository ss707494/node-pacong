/**
 * Created by Administrator on 2017/6/13.
 */

import Koa from 'koa'
import koaBody from 'koa-body'
import {initMongo} from '../mongodb'

const initServer = async (option={}) => {
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

    return await initMongo();
}

import {downImgByList} from '../util/download'
import fs from 'fs'
//
function downloadImg(data) {
    console.log(JSON.stringify(data));
    if (!data.title || !data.data) {
        throw 'dataError:' + JSON.stringify(data);
    }
    downImgByList(JSON.parse(data.data), data.title, './images/', 5);
}

import {doCasper} from '../casper/index'
import {eachLimit} from 'async'
import {fsExistsSync} from '../util/download'
import {urls} from '../mongodb'

const handleUrls = async (data) => {
    console.log(JSON.stringify(data));
    if (!data.data) {
        throw 'dataError:' + JSON.stringify(data);
    }
    const res = await urls.insertOne(data);
    console.log(res);
    return
    eachLimit(JSON.parse(data.data), 5, (e, callback) => {
        doCasper('./babel/casper/casperTest.js', e, callback)
    })
}

export {
    initServer
}
