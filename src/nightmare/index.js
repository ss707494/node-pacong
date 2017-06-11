/**
 * Created by Administrator on 2017/6/11.
 */

var isDebug = 0;
var path = require('path')
var option = isDebug => isDebug ? {
    openDevTools: {
        mode: 'bottom'
    },
    show: true,
    executionTimeout: 300000000,
    webPreferences: {
        preload: path.resolve("lib/custom.js")
    }
} : {
    show: false,
    webPreferences: {
        preload: path.resolve("lib/custom.js")
    }
}
var Nightmare = require('nightmare');

async function test() {
    var nightmare = Nightmare(option(1));
    var title = await nightmare.goto('https://www.google.com/search?newwindow=1&q=%E7%94%B5%E5%BD%B1+%E7%BB%8F%E5%85%B8+%E6%BC%94%E8%AE%B2&oq=%E7%94%B5%E5%BD%B1+%E7%BB%8F%E5%85%B8+%E6%BC%94%E8%AE%B2&gs_l=serp.3...11390.11390.0.11817.1.1.0.0.0.0.197.197.0j1.1.0....0...1.1.64.serp..0.0.0.dmwLryJW2HA')
        .click('#ires a')
        .title()
    console.log(title);

}
test();

async function getIn() {
    var nightmare = Nightmare(option(0));

    var url = 'http://www.yac8.com/news/13937.html'
    var __res = ''
    nightmare = nightmare
        .goto(url)
        .inject('js', './lib/jquery-3.2.1.min.js')

    for (var i = 0; i < 3; i++) {
        nightmare = nightmare.evaluate(function () {
            var res = $.map($('#newsContent img:not(.pointer)'), e => $(e).attr('src'))
            storeData('map', res);
            $('.pageNavBox div:last a').attr('id', '__next');
        })
            .clice('#__next')
            .wait(3000);
    }
    nightmare.evaluate(function () {
        return getData__()
    })
        .end()
        .then(function (result) {
            console.log(result);
        })
        .catch(function (error) {
            console.error('Search failed:', error);
        })
    ;
}

