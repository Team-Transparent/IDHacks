// replace all stuff that looks like 1's with bona fide 1's
var save1 = /([li]+) ?(\d)/ig;

var str = "22I I00 Travel Out ol&apos;(&apos;ountry 0 3.474.800 7.l49,600";
while(str.match(save1)){
	str = str.replace(save1, "1$2");
}

console.log(str);
