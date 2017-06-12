/**
 * Created by Administrator on 2017/6/11.
 */

var picArr = [],
    page = 0;

var casper = require('casper').create({
    clientScripts: './lib/jquery-3.2.1.min.js',
    pageSettings: {
        loadImages: false, // The WebPage instance used by Casper will
        loadPlugins: false // use these settings
    }
});
var url2 = casper.cli.args.toString() || 'http://www.yac8.com/news/list_32.html';
casper.start();
casper.open(url2);

function getUrls() {
    $('#newsList .navBtnPointer.fontNav_2:eq(-2)').attr('id', '__cli');
    var href = location.href;
    var url = href.slice(0, href.lastIndexOf('/') + 1)
    return $.map($('#newsList li .b h4 a'), function (e) {
        return url + $(e).attr('href')
    });
}
casper.then(function () {
    var le = this.evaluate(getUrls)
    page = this.evaluate(function () {
        return $('#newsList .navBtn option:last').val();
    })
    picArr = picArr.concat(le);
    this.thenClick('#__cli');
    getByN({
        n: page,
        n: 3,
        _cas: this
    })
})
function getByN(option) {
    var flag = option.n - 2,
        _cas = option._cas,
        i = 0;
    while (flag - i++) {
        _cas.then(function () {
            var le = this.evaluate(getUrls)
            picArr = picArr.concat(le);
            this.thenClick('#__cli');
        })
    }
}
casper.then(function () {
    this.echo(JSON.stringify(picArr));
})
casper.run();

