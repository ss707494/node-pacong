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
var url2 = casper.cli.args.toString();
casper.start();
casper.open(url2);

function getPicUrls() {
    $('.pageNavBox td div:last a').attr('id', '__cli');
    var href = location.href;
    var url = href.slice(0, href.lastIndexOf('/') + 1)
    return $.map($('#newsContent img'), function (e) {
        return url + $(e).attr('src')
    });
}
casper.then(function () {
    var le = this.evaluate(getPicUrls)
    page = this.evaluate(function () {
        return $('.pageNavBox td div:eq(-2) a').text().replace(/\./g, '');
    })
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
            var le = this.evaluate(getPicUrls)
            picArr = picArr.concat(le);
            this.thenClick('#__cli');
        })
    }
}
casper.then(function () {
    this.echo(JSON.stringify(picArr));
})
casper.run();

