var express = require('express');
var fs = require('fs');
var restler = require('restler');
var _ = require('underscore');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload/:id', function(req, res, next ) {
    var pdfId = req.params.id;
    var filename = "pdf/" + pdfId + ".pdf";
    console.log('PDF ID =', pdfId);

    fs.stat(filename, function(err, stats) {
        restler.post("https://api.idolondemand.com/1/api/sync/storeobject/v1", {
            multipart: true,
            data: {
                apikey: "e0ce31f4-9608-45ad-92ef-2aa13fc94471",
                file: restler.file(filename, null, stats.size, null, "application/pdf")
            }
        }).on("complete", function(data) {
            // data = { reference : string }
            if(data && data.reference){
                var reference = data.reference;
                console.log("Reference =", reference);

                restler.post("https://api.idolondemand.com/1/api/sync/ocrdocument/v1", {
                    data: {
                        apikey: "e0ce31f4-9608-45ad-92ef-2aa13fc94471",
                        reference: reference,
                        mode: "document_scan"
                    }
                }).on("complete", function(data) {
                    // grab text from data
                    var text = _(data.text_block).pluck('text').join('\n');
                    console.log("Text =", text);
                    res.render('dump', { text: text });
                });
            }
            else {
                res.render('fail', { message: 'Error parsing PDF!'})
            }
        });
    });
});

router.get('/ocr', function(req, res, next){

});

module.exports = router;
