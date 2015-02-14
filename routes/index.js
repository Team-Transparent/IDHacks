var express = require('express');
var fs = require('fs');
var restler = require('restler');
var _ = require('underscore');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', function(req, res, next ) {
    fs.stat("pdf/7.pdf", function(err, stats) {
        restler.post("https://api.idolondemand.com/1/api/sync/storeobject/v1", {
            multipart: true,
            data: {
                apikey: "e0ce31f4-9608-45ad-92ef-2aa13fc94471",
                file: restler.file("pdf/7.pdf", null, stats.size, null, "application/pdf")
            }
        }).on("complete", function(data) {
            // data = { reference : string }
            console.log(data);
            res.render('index', { title: 'Uploaded!' });
        });
    });
});

router.get('/ocr', function(req, res, next){
    restler.post("https://api.idolondemand.com/1/api/sync/ocrdocument/v1", {
        data: {
            apikey: "e0ce31f4-9608-45ad-92ef-2aa13fc94471",
            reference: "b01d55e5-1e46-4fa9-b6a1-085c7cf348f3",
            mode: "document_scan"
        }
    }).on("complete", function(data) {
        // grab text from data
        var text = _(data.text_block).pluck('text').join('\n');
        console.log(text);
        res.render('dump', { text: text });
    });
});

module.exports = router;
