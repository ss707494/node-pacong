/**
 * Created by Administrator on 2017/6/14.
 */

//test
import {MongoClient} from 'mongodb'
import assert from 'assert'
import _ from 'lodash'

var url = 'mongodb://localhost:27017/shufa';

async function test() {
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

const urls = {

    insertOne: async data => {
        var db = await MongoClient.connect(url)
        return await db.collection('urls').insertOne(data);
    }
}

export {
    initMongo,
    urls,
    test
}
