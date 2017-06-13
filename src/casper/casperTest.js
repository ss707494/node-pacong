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

function getPicUrls() {
    $('.pageNavBox td div:last a').attr('id', '__cli');
    var href = location.href;
    var url = href.slice(0, href.lastIndexOf('/') + 1)
    return $.map($('#newsContent img'), function (e) {
        var imgSrc = $(e).attr('src');
        return imgSrc.indexOf('http:') == -1 ? url + imgSrc : imgSrc;
    });
}
casper.then(function () {
    var le = this.evaluate(getPicUrls)
    page = this.evaluate(function () {
        return $('.pageNavBox td div:eq(-2) a').text().replace(/\./g, '');
    })
    title = this.getTitle();
    picArr = picArr.concat(le);
    this.thenClick('#__cli');
    getByN({
        n: page,
        _cas: this
    })
})
function getByN(option) {
    var flag = option.n - 2,
        _cas = option._cas,
        i = 0;
    while (flag - i++) {
        _cas.then(function () {
            this.echo(JSON.stringify(picArr))
            var le = this.evaluate(getPicUrls)
            picArr = picArr.concat(le);
            this.thenClick('#__cli');
        })
    }
}
casper.then(function () {
    var _picArr = JSON.stringify(picArr);
    var _title = title;
    this.evaluate(function (title, data) {
        // __utils__.sendAJAX('http://localhost:3000/downloadImg', 'POST', {ss: '123'});
        __utils__.echo(JSON.stringify({title, data}));
        __utils__.sendAJAX('http://localhost:3000/downloadImg', 'POST', {title, data});
    }, _title, _picArr)
})

casper.run();

