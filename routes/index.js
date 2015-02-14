var express = require('express');
var fs = require('fs');
var restler = require('restler');
var _ = require('underscore');

var router = express.Router();

var convertPdf = function(pdfId, success, failure) {
    var filename = "public/pdf/" + pdfId + ".pdf";
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

                    // res.render('dump', { text: text });
                    if(success){ success(text); };
                });
            }
            else {
                // res.render('fail', { message: 'Error parsing PDF!'})
                if(failure){ failure(); };
            }
        });
    });
}

function makeCSV(input, outputfile) {
    var array = input.split("\n");
    fs.writeFile(outputfile + '.txt', 'ID,FY12,FY13,FY14\r\n')
    for (i in array) {
        last = array[i].length - 1;
        if (!isNaN(array[i][0]) && !isNaN(array[i][last])) { // only writes out lines that begin and end with numbers
            parsedline = array[i].replace(/[^\d\s]/g, ''); //remove all non-numerical characters and double spaces from line
            condnsline = parsedline.replace(/\s+/g, ' '); // cut out excess space
            csvline = condnsline.replace(/\s/g, ',') + '\r\n';
            console.log(csvline);
            fs.appendFile(outputfile + '.txt', csvline);
        }
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET list of PDFs */
router.get('/list', function(req, res, next){
    fs.readdir("public/pdf", function(err, files){
        // filter out non-pdfs and hidden files
        files = _.filter(files, function(file){
            return (file.indexOf(".pdf") > -1)
                && !(file.indexOf(".") == 0)
        });

        if(err){
            res.render('fail', {message: 'Error getting file list!'});
        }
        else{
            res.render('pdflist', {files: files});
        }
    });
});

/* Turns PDF into CSV. Only for Ajax! */
router.get('/convert/:id', function(req, res, next ) {
    var pdfId = req.params.id;
    convertPdf(pdfId, function success(text) {
        makeCSV(text, "public/csv/" + pdfId);
        res.send(text);
    }, function failure(){
        res.send('Error parsing PDF!');
    });
});


/* GET text from PDF */
router.get('/text/:id', function(req, res, next ) {
    var pdfId = req.params.id;
    convertPdf(pdfId, function success(text) {
        res.render('dump', { text: text });
    }, function failure(){
        res.render('fail', { message: 'Error parsing PDF!'});
    });
});

/* GET csv */
router.get('/csv/:id', function(req, res, next) {
    var id = req.params.id;
    fs.readFile('public/csv/' + id + '.txt', 'utf8', function(err, data) {
        if(err){
            console.log(err);
            res.send("");
        }
        else{
            res.send(data);
        }
    });
});


module.exports = router;
