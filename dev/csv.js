var _ = require('underscore');

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

var toCsv = function(rawText) {
    var inlines = rawText.split("\n");
    
    console.log(new csvItem({fy12: "hi"}));
}


toCsv("! - &apos; &apos;\nVOTE 08\nCONSTITUTIONAL\nCOMMISSION\nt\n•\n&apos;x\n3\n!\nVote 08 Constitutional Review Commission\n&quot;A.#ES&apos;I?llVlATE of the amount required in the year ending 30th June, 2014, the salaries and expenses of Constitutional Review\n; Commission\nTlrilfy-rllree billion nine lrumlredjorryjbur million we lrumlred eighty-eight thousand\n(Sits. 33,944,588,000)\n;;B; Sub-Votes under which this vote will be accounted for by the Secretary, Constitutional Review Commission , are\nset out in the details below.\nItem Description 2011/2012 2012/2013 2013/2014\nActual Approved Estimates\nExpenditure Estimates\nShs• Shs. Shs.\nPROGRAMME 10 ADMINISTRATION\nSubvote 1001 ADMINISTRATION AND IIR MANAGEMENT\n210300 Personnel Allowances - (Non-Discretionary) 0 10.234,000,000 12, 193,000,000\n210400 Personnel Allowances - (Discretionary); Optional 0 0 50,000,000\n220100 Office And General Supplies And Services 0 253,200,000 670,000,000\n220200 Utilities Supplies and Services 0 177,992,000 2 10,000,000\n220300 Fuel, Oils ,Lubricants 0 4,774,044,000 1,744, 100,000\n- 229400, , Medical Supplies and Services 0 0 18,000,000\n,220600 ; Cl;othing,Bedding, Footwear And Services 0 0 2 l ,000,000\n220700 Rental Expenses 0 2,032,588,800 1,650,000,000\n221000 Travel - Ill - Country 0 4,399,200,000 1,868,000,000\n&lt;.221200 ; ;;Communications &amp; Information 0 2 lg, 192,000 187,200,000\n&quot;2?2ii400&apos;, Hospitality Supplies and Services 0 300,000.000 463,243,000\n229900 Other Operating Expenses 0 10,000,000 22,000,000\n230400 , Routine Maintenance And Repair Of Vehicles And 0 300,000,000 360,000,000\nTransportation Equipment\n.2;l0700 1 Routine Maintenance And Repair Of Office Equipment 0 0 70,000,000\nV;&apos; =,&quot;%;vAnd&apos;Applial1ces\n&quot; &quot; ,rf * &quot; I\n4N200 &apos; ?;A@cquisition of Vehicles and Transpotation Equipment 0 4,229,556,000 0\n410500 Acquisition Of Household &amp; Institutional Equipment 0 55,698,200 45,000,000\n, 5*16900 Acquisition Of Office and General Equipment 0 200,000,000 25,000,000\nTotal of Subvote 0 27,l85,471,000 19,596543,000\nSubvote 1002 FINANCE AND ACCOUNT UNIT\n220IQ0 €,,;Oi&quot;f&quot;tce And General Supplies And Services 0 288,732,000 20,000,000\n; ; ]Ej:i;aining - Domestic 0 0 14,250,000\n221*000 ;é:•Travel - ln - Country 0 0 6,000,000\nTotal ol&apos; Subvote 0 288,732,000 40,250,000\nSubvote TQ03 INTERNAL AUDIT UNIT\n, ii, ide; &apos;\n30300 Personnel Allowances - (Non-Discretionary) 0 0 12 ,000 ,000\n220100 Office And General Supplies And Services 0 220,488,000 11,000,000\n. 2208.09 ; , Training - Domestic 0 0 6,750,000\n221006 ..jTraveL- In - Country 0 0 3 1,450,000\n&quot;,Hospitality Supplies and Services 0 0 3,000.000\n;s;; * $ £ , , 4\n&quot; &apos; éa &apos; t is.! &quot; &amp;;\nVote 08 Constitutional Review Commission\nItem Description 2011/2012 2012/2013 2013/2014\nActual Approved Estimates\nExpenditure Estimates\nShs• Shs. Shs•\nTotalofSubvote 0 220,488,000 64,200,000\nSubvote I004 PROCUREMENT MANAGEMENT UNIT\n2I0300 Personnel Allowances - (Non-Discretionary) 0 30,000.000 50,000,000\n220100 Ofllce And General Supplies And Services 0 1 10,244,000 19,000,000\n220800 Training - Domestic 0 0 3,280,000\n221000 Travel - ln - Country 0 0 3,200,000\n221200 Communications &amp; Information 0 20,000,000 10,000,000\n221400 Hospitality Supplies and Services 0 10,000,000 12,000,000\nTotal ol&apos;Subvote 0 170,244,000 97,480,000\nSubvote ; 1005 INFORMATION COMMUNICATION AND TECHNOLOGY\n220100 Office And General Supplies And Services 0 320,000,000 226,000,000\n221200 Communications &amp; Information 0 104.000,000 84,000,000\n229900 Other Operating Expenses 0 200,000.000 75.000,000\n410600 Acquisition Ol&quot;Ol&quot;Iice and General Equipment 0 30,000,000 102.000.000\nTotal ol&quot; Subvote 0 654,000,000 487,000,000\nSubvote 1006 COMMUNICATIONS AND OUTREACH\n220I00 Office And General Supplies And Services 0 202,500,000 8, 180,000,000\n220600 Clothing,Bedding, Footwear And Services 0 0 40,000,000\n221000 Travel - ln - Country 0 70.000,000 12.000,000\n22I200 Communications &amp; Information 0 150.000,000 500.000,000\n221300 Educational Material, Supplies and Services 0 182,500,000 1,578,195,000\nTotal ol&apos; Subvote 0 605,000,000 l0,310,l95,000\nSubvote I007 REVIEW COORDINATION UNIT\n210300 Personnel Allowances - (Non-Discrctionary) 0 123,677,000 0\n210400 Personnel Allowances - (Discrclionary)- Optional 0 0 604,800,000\n220100 Office And General Supplies And Services 0 440,976.000 75,000.000\n220300 Fuel, Oils .Lubricants 0 0 218,500,000\n220600 Clothing,Bedding, Footwear And Services 0 0 30,000,000\n220700 Rental Expenses 0 820.000,000 660.000.000\n221000 Travel - ln - Country 0 600,000,000 1,493,820,000\n221200 Communications &amp; Information 0 2.076,000,000 0\n22I400 Hospitality Supplies and Services 0 410,000,000 266,800,000\n229900 Other Operating Expenses 0 350,000,000 0\nTotal of Subvote 0 4,820,653,000 3,348,920,000\nTotal of Programme 0 33,944,588,000 33,944,588,000\n5\nVote 08 Constitutional Review Commission\nItem Description 20III20I2 2012/20l3 2013120I4\nActual Approved Estimates\nExpenditure Estimates\nShs. Shs. Shs.\nTotal of Vote 0 33,944,588,000 33,944,588,000\nLess Retention Scheme Funds 0 0 0\nNet Total of Vote 0 33,944,588,000 33,944,588,000\n6");