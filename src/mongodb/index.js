/**
 * Created by Administrator on 2017/6/14.
 */

//test
import 'babel-polyfill'
import {MongoClient} from 'mongodb'
import assert from 'assert'
import _ from 'lodash'

var url = 'mongodb://localhost:27017/shufa';

const test = async () => {
    var db = await MongoClient.connect(url);
    await creatCol(db)(['urls', 'imgs']);
    await findone(db);

    await db.close();
}
var creatCol = (db) => async (names) => {
    const collections = await db.collections();
    var res = _.filter(names, name => {
        return !_.some(collections, e => (e.collectionName === name))
    })
    await Promise.all(_.map(res, e => db.createCollection(e)))
};

const findone = async db => {
    const collections = await db.collections();
    debugger
    console.log(collections);
}

const initMongo = async () => {
    var db = await MongoClient.connect(url);
    await creatCol(db)(['urls', 'imgs']);
    const stats = await db.stats();
    await db.close();
    return stats;
}

const conDataTool = col => async callback => {
    var db = await MongoClient.connect(url)
    var res = await callback(db.collection(col), db);
    await db.close();
    return res;
}

const urls = {

    insertOne: async data => {
        return conDataTool('urls')(async col => {
            await col.deleteMany({});
            return await col.insertOne({data: JSON.parse(data.data)});
        })
    },

    findOne: async (data = {}) => conDataTool('urls')(async col => {
        return await col.findOne(data)
    })

}

const imgs = {

    deleteMany: async (data={}) => {
        var db = await MongoClient.connect(url)
        var res = await db.collection('imgs').deleteMany(data);
        await db.close();
        return res;
    },

    insertOne: async data => {
        let _data = typeof data === 'object' ? data : JSON.parse(data);
        _data.isDown = 0;
        _data.data = JSON.parse(_data.data);
        var db = await MongoClient.connect(url)
        var res = await db.collection('imgs').insertOne(_data);
        await db.close();
        return res;
    },

    find: async (data = {}) => {
        var db = await MongoClient.connect(url)
        var collection = db.collection('imgs');
        var res = await collection.find(data);
        await db.close();
        return res;
    },

    findOne: async (data={}) => {
        var db = await MongoClient.connect(url)
        const res = await db.collection('imgs').findOne(data);
        await db.close();
        return res;
    }
}

export {
    initMongo,
    urls,
    imgs,
    conDataTool,
    test
}
