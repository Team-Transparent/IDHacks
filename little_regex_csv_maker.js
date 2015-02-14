var fs = require('fs');

//function makeCSV(inputtextfile)
var array = fs.readFileSync('sample.txt').toString().split("\n");
fs.writeFile('sampleout.txt', 'ID,FY12,FY13,FY14\r\n')
for(i in array) {
	last = array[i].length-1;
	if (!isNaN(array[i][0]) && !isNaN(array[i][last])){ 	// only writes out lines that begin and end with numbers
		parsedline = array[i].replace(/[^\d\s]/g, '');	//remove all non-numerical characters and double spaces from line
		condnsline = parsedline.replace(/\s+/g, ' ');
		csvline = condnsline.replace(/\s/g, ',') + '\r\n';
		console.log(csvline);
    	fs.appendFile('sampleout.txt', csvline);
    }
}

