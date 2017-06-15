/**
 * Created by Administrator on 2017/6/11.
 */

var picArr = [],
    title = '',
    page = 0;

var casper = require('casper').create({
    clientScripts: './lib/jquery-3.2.1.min.js',
    pageSettings: {
        loadImages: false, // The WebPage instance used by Casper will
        loadPlugins: false // use these settings
    }
});
var url2 = casper.cli.args.toString();
casper.options.onError = function (casper, msg) {
    casper.echo(url2);
}
casper.start();
casper.open('www.baidu.com');

casper.thenEvaluate(function () {
})
casper.run();

