$('a').click(function(){
	var page = $(this).attr('href');
	var x = "page2.html#"+page+"";
	$("#content").attr("src", x);
	return false;
});