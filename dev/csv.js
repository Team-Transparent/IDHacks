var _ = require('underscore');
_.mixin(require('underscore.inflections'));

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

// Cleans up the given input string.
var tidy = function(item){
	item = item.toLowerCase();
	item = _.titleize(item);

	return item;
}

var toCsv = function(rawText) {
    var inlines = rawText.split("\n");

	// regex list
	var voteRegex = /^vote \d+ ([\s\S]+)$/ig;
	var programRegex = /^programme \d+ ([\s\S]+)$/ig;
	var subvoteRegex = /^subvote \d+ ([\s\S]+)$/ig;
	var itemRegex = /^\d{6} [^\d]* ([\d.,])* ([\d.,])* ([\d.,])*$/ig;

    // these are thing to keep track of as we go through each item
    var vote, program, subvote;

	// sanitize each line
	inlines = _.map(inlines, function(line){
		return line;
	});

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
	_.each(inlines, function(line){
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

		// now we can check for
	});

	// clean up all inputs
	vote = tidy(vote);
	program = tidy(program);
	subvote = tidy(subvote);

    console.log("Vote:", vote);
	console.log("Program:", program);
	console.log("Subvote:", subvote);
}

toCsv("VOte 07 Treasury Registrar&apos;s Oflice\nA. ESTIMATE of the amount required in the year ending 30th June, 2014, the salaries and expenses of Treasury Registrafs\nOffice\nThirty-eight billion eighty-eight million one lmmlredjorty-two thousand\n(Sims. 38,088,I42,000)\nB. Sub-Votes under which this vote will be accounted for by the Treasury Registrar, Treasury Registrar&apos;s Office ,\nare set out in the details below.\nItem Description 2011/2012 2012/2013 2013/2014\nActual Approved Estimates\nExpenditure Estimates\nShs. Shs. Shs.\nPROGRAMME 10 ADMINISTRATION\nSubvote 1001 ADMINISTRATION AND HUMAN RESOURCES MGT\n210100 Basic Salaries - Pensionable Posts 0 0 303, 192,000\n210300 Personnel Allowances - (Non-Discretionary) 0 0 176,350,000\n210400 Personnel Allowances - (Discretionary)- Optional 0 0 70,000,000\n220100 Office And General Supplies And Services 0 0 599,535,000\n220200 Utilities Supplies and Services 0 0 300,000,000\n220300 Fuel, Oils ,Lubricants 0 0 20,255,000\n220700 Rental Expenses 0 0 894,500,000\n220800 Training - Domestic 0 0 36,000,000\n220900 Training - Foreign 0 0 497,500,000\n221000 Travel - In - Country 0 0 32,500,000\n221200 Communications &amp; Information 0 0 350,000,000\n221400 Hospitality Supplies and Services 0 0 13,000,000\n229900 Other Operating Expenses 0 0 34,0 l7,5 10,000\n230400 Routine Maintenance And Repair Of Vehicles And 0 0 322,400,000\nTransportation Equipment\n230700 Routine Maintenance And Repair Of Oflice Equipment 0 0 4,400,000\nAnd Appliances\n410400 Acquisition of Specialized Equipment 0 0 300,000,000\n410500 Acquisition Of Household &amp; Institutional Equipment 0 0 1,000,000\n411000 Rehabilitation and Other Civil Works 0 0 I50,000,000\nTotal of Subvote 0 0 38,088,142,000\nTotal of Programme 0 0 38,088,M2,000\nTotal ofVote 0 0 38,088,M2,000\nLess Retention Scheme Funds 0 0 0\nNet Total of Vote 0 0 38,088,142,000\n2");
