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
        _cas: this
    })
})
function getByN(option) {
    var flag = option.n - 1,
        _cas = option._cas,
        i = 0,
        _stop = true;
    while (_stop && flag - i++) {
        _cas.waitWhileSelector('#__cli', function () {
            this.then(function () {
                // this.echo(JSON.stringify(picArr))
                var le = this.evaluate(getUrls)
                // this.echo(this.getCurrentUrl());
                // this.echo(option.n);
                picArr = picArr.concat(le);
                if (!this.exists('#__cli')) return _stop = false;
                this.thenClick('#__cli');
            })
        })
    }
}
casper.then(function () {
    var _picArr = JSON.stringify(picArr);
    this.evaluate(function (data) {
        __utils__.echo(JSON.stringify({data}));
        __utils__.echo(JSON.parse(data).length);
        __utils__.sendAJAX('http://localhost:3000/handleUrls', 'POST', {data});
    }, _picArr)
})
casper.run();

