/**
 * Created by Administrator on 2017/6/11.
 */

var fs = require('fs');
var casper = require('casper').create({
    clientScripts: './lib/jquery-3.2.1.min.js'
});
casper.start();
casper.open('http://www.yac8.com/news/13937.html');
casper.then(function () {
    this.echo(this.evaluate(function () {
        return document.title;
    }));
})
casper.echo(casper.getTitle());
casper.then(function () {
    var le = this.evaluate(function () {
        var href = location.href;
        var url = href.slice(0, href.lastIndexOf('/') + 1)
        return url + $('#newsContent img:first').attr('src');
    })
    this.echo(le)
    fs.write('./cachFile/cach.txt', le);
    // downloadImg(le, 'ss.jpg');
})
// casper.thenClick('#__cli', function () {
//         this.echo(this.evaluate(function () {
//             return location.href;
//         }));
// });

casper.run();

// var dir = 'images'

// var downloadImg = function (url, filename) {
//     request.head(url, function (err, res, body) {
//         request(url).pipe(fs.createWriteStream(dir + "/" + filename));
//     });
// };

