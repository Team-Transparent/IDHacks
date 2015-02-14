var express = require('express');
var fs = require('fs');
var restler = require('restler');
var _ = require('underscore');
_.mixin(require('underscore.inflections'));

var router = express.Router();


/*
    Creates a CSV item. Pass an object containing:
        id: int
        vote: string
        program: string
        subvote: string
        itemName: string
        fy12: int
        fy13: int
        fy14: int

*/
var csvItem = function(input) {
    this.id = input.id;
    this.vote = input.vote;
    this.program = input.program;
    this.subvote = input.subvote;
    this.itemName = input.itemName;
    this.fy12 = input.fy12;
    this.fy13 = input.fy13;
    this.fy14 = input.fy14;
}
csvItem.prototype.toString = function(){
    var data = [
        this.id,
        this.vote,
        this.program,
        this.subvote,
        this.itemName,
        this.fy12,
        this.fy13,
        this.fy14
    ];
    var str = data.join(',');
    return str;
}

// Cleans up the given input string.
var tidy = function(item){
    item = item.toLowerCase();
    item = _.titleize(item);

    // commas mess up csv so get rid of them
    item = item.replace(/,/g, '');

    // remove duplicate spaces
    item = item.replace(/\s+/g, ' ');

    return item;
}

// Cleans up the given number.
var tidyNumber = function(numberString){
    numberString = numberString.replace(/[., ]/g, '');
    var number = parseInt(numberString);
    return number;
}

/*
    Based on the regex that matches numerical misidentifications,
    fixes up the string and returns it.
*/
var saveNumbers = function(str, regex, formula){
    while(str.match(regex)){
        str = str.replace(regex, formula);
    }
    return str;
}

/*
    Converts the given raw text (readout from pdf) into a CSV-formatted string.
*/
var toCsv = function(rawText) {
    var inlines = rawText.split("\n");

    // regex list
    var voteRegex = /^vote \d+ ([\s\S]+)$/ig;
    var programRegex = /^programme \d+ ([\s\S]+)$/ig;
    var subvoteRegex = /^subvote \d+ ([\s\S]+)$/ig;
    var itemRegex = /^(\d{6}) ([^\d]*) ([\d.,]*) ([\d.,]*) ([\d.,]*)$/ig;

    // to clean up numbers
    var save1 = /([li]+) ?(\d)/ig;
    var save1_before = /(\d) ?([li]+)/ig;

    // these are thing to keep track of as we go through each item
    var vote, program, subvote;

    // sanitize each line
    inlines = _.map(inlines, function(line){
        // replace all stuff that looks like 1's with bona fide 1's
        line = saveNumbers(line, save1, function(match, p1, p2){
            return "1" + p2;
        });
        line = saveNumbers(line, save1_before, function(match, p1, p2){
            return p1 + "1";
        });
        return line;
    });

    console.log(inlines);

    // first find vote name
    // loop through ENTIRE file for this just to be sure because this is vital
    _.each(inlines, function(line){
        if(!vote){
            var match = voteRegex.exec(line);
            if (match){
                vote = match[1];
            }
        }
    });

    // now loop over to each item
    var items = _.map(inlines, function(line){
        // check for program
        var match = programRegex.exec(line);
        if(match){
            program = match[1];
        }

        // check for subvote
        match = subvoteRegex.exec(line);
        if(match){
            subvote = match[1];
        }

        // now we can check for items
        if(vote && program && subvote){
            match = itemRegex.exec(line);
            if(match){
                // id, itemName, fy12, fy13, fy14

                // clean up all inputs
                var id = tidyNumber(match[1]);
                var itemName = tidy(match[2]);
                var fy12 = tidyNumber(match[3]);
                var fy13 = tidyNumber(match[4]);
                var fy14 = tidyNumber(match[5]);

                vote = tidy(vote);
                program = tidy(program);
                subvote = tidy(subvote);

                // add item
                var item = new csvItem({
                    id: id,
                    vote: vote,
                    program: program,
                    subvote: subvote,
                    itemName: itemName,
                    fy12: fy12,
                    fy13: fy13,
                    fy14: fy14
                });

                return item;
            }
        }

        return null;
    });

    // clean up by removing non-items
    items = _.compact(items);

    // turn to strings
    var strings = _.map(items, function(item){
        return item.toString();
    });

    // to csv
    var csvBody = strings.join('\n');
    var csvHead = [
        'id',
        'vote',
        'program',
        'subvote',
        'item',
        'fy12',
        'fy13',
        'fy14'
    ].join(',');
    var csvContent = csvHead + '\n' + csvBody;

    return csvContent;
}

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
                    // console.log("Text =", text);

                    // res.render('dump', { text: text });
                    if(success){ success(text); };
                });
            }
            else {
                // res.render('fail', { message: 'Error parsing PDF!'})
                console.log('Failure!');
                if(failure){ failure(); };
            }
        });
    });
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

/* Turns PDF into CSV and returns the CSV text. */
router.get('/convert/:id', function(req, res, next ) {
    var pdfId = req.params.id;
    convertPdf(pdfId, function success(text) {
        var csvContent = toCsv(text);
        console.log(csvContent);

        // save to file
        fs.writeFile('public/csv/' + pdfId + '.csv', csvContent, function(err, data){
            if(err){
                console.log(err);
                res.send('Error saving file!');
            }
            else{
                res.send(csvContent);
            }
        });
    }, function failure(){
        res.send('Error parsing PDF!');
    });
});


/* GET text from PDF in human-readable format */
router.get('/text/:id', function(req, res, next ) {
    var pdfId = req.params.id;
    convertPdf(pdfId, function success(text) {
        res.render('dump', { text: text });
    }, function failure(){
        res.render('fail', { message: 'Error parsing PDF!'});
    });
});

/* GET straight-up csv data from a CSV file that you already know exists */
router.get('/csv/:id', function(req, res, next) {
    var id = req.params.id;
    fs.readFile('public/csv/' + id + '.csv', 'utf8', function(err, data) {
        if(err){
            console.log(err);
            res.send("");
        }
        else{
            res.send(data);
        }
    });
});

/* GET Visualize */
router.get('/visualize', function(req, res, next){
    res.render('visualize', {});
});

/* interactive CSV visualizer */
router.get('/interactive', function(req, res, next){
    res.render('interactive', {
        csvs: [
            7,
            8
        ]
    });
});

module.exports = router;
