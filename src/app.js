import {doCasper} from './casper/index'
import "babel-polyfill";

(async function () {
    doCasper('./babel/casper/getAllPageUrl.js', 'http://www.yac8.com/news/list_32.html');
    // doCasper('./babel/casper/casperTest.js', 'http://www.yac8.com/news/12980.html')
    // doCasper('./babel/casper/casperTest.js', 'http://www.yac8.com/news/9802.html')
})();

