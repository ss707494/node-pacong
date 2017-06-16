import "babel-polyfill";
import {conDataTool} from './mongodb'
import {eachLimit} from 'async';
import _ from 'lodash'
import {readdir, downImgByList, fsExistsSync} from './util/download'
import fs from 'fs'

(async function () {
    try {
        // const list = await conDataTool('imgs')(async col => {
        //     return await col.find({title: /:/}).toArray();
        // })
        // await Promise.all(list.map(async e => {
        //     return await conDataTool('imgs')(async col => {
        //         return await col.updateOne(e, {$set: {title: e.title.replace(/:/g, '')}})
        //     })
        // }))
        // return

        const dir = './images';
        var dirTitles = await readdir(dir);
        const dirImgs = await Promise.all(dirTitles.map(async e => {
            const imgs = await readdir(`${dir}/${e}`);
            return {title: e, imgs}
        }))
        await Promise.all(dirImgs.map(async e => {
            await conDataTool('imgs')(async col => {
                const one = await col.findOne({title: e.title, isDown: 0})
                if (one && one.data.length === e.imgs.length) {
                    await conDataTool('imgs')(async col => {
                        await col.updateOne(one, {$set: {isDown: 1}});
                    })
                }
            })
        }))
        await conDataTool('imgs')(async col => {
            const isDownList = await col.find({isDown: 1}).toArray();
            isDownList.map(e => {
                const dirImg = _.find(dirImgs, d => d.title === e.title)
                if (!dirImg || e.data.length !== dirImg.imgs.length) {
                    conDataTool('imgs')(async col => {
                        await col.updateOne(e, {$set: {isDown: 0}});
                    })
                }
            })
        })
        debugger
        // if (files.length === e.data.length) {
        //     await conDataTool('imgs')(async col => {
        //         await col.updateOne({_id: e._id}, {$set: {isDown: 1}});
        //     })
        // }

    } catch (err) {
        console.log(err);
    }
})();

