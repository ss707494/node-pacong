import {doCasper} from './casper/index'
import {initServer} from './server/index'

initServer();

(async function () {
    // doCasper('./src/casper/casperDebug.js', 'www.baidu.com');
    doCasper('./babel/casper/getAllPageUrl.js', 'http://www.yac8.com/news/list_32.html');

    // doCasper('./babel/casper/casperTest.js', 'http://www.yac8.com/news/12980.html')
    // doCasper('./babel/casper/casperTest.js', 'http://www.yac8.com/news/9802.html')
})();

