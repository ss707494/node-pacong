import "babel-polyfill";
import {doCasper,doCasperPromise} from './casper/index'

(async function () {
    await doCasperPromise('./babel/casper/getAllPageUrl.js', 'http://www.yac8.com/news/list_32.html');
})();

