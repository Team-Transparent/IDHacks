$('.upload').click(function(){
    var button = $(this);
    button.find('span').addClass('fa-spin');

    var value = button.attr('value').replace(".pdf","");
    $.get('/convert/' + value, function(data){
        console.log(data);
        button.closest('p').remove();
    });
});
