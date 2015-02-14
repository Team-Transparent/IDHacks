$(function(){
    $('.csv').on('click', function(){
        loadCsv($(this).attr('id'));
    });
});

function loadCsv(id){
    $.get("csv/" + id + ".csv", function(data){
        console.log(data);
        populate(data, id);
    });
}

function populate(data, id){
    $('#results-placeholder').hide();
    $('#results-pane').show();
    $('#csv-output').html(data);
    $('#visualize-link').attr('href', '/visualize/' + id);
    $('#download-link').attr('href', 'csv/' + id + '.csv').attr('download', 'vote-' + id + '.csv');
}
