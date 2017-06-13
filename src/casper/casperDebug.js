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
casper.open(url2);

casper.thenEvaluate(function () {
    __utils__.echo('123');
    __utils__.sendAJAX('http://localhost:3000/downloadImg', 'POST', {ss: '123'});
})
casper.run();

