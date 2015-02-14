$('.upload').click(function(){
    var value = $(this).attr('value').replace(".pdf","");
    $.get('/convert/' + value, function(data){
        console.log(data);
    });
});
