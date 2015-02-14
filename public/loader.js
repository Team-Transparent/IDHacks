$('a').click(function(){
	var page = $(this).attr('href');
	var x = "bar.html#"+page+"";
	$("#content").attr("src", x);
	return false;
});