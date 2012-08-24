$(function() {
  $('#searchBar').keyup(function(e) {
    var errors = $('.nodejitsu'),
        search = $('#searchBar').val().toLowerCase();

    errors.hide();
    errors.filter(function() {
      if($(this).children().text().toLowerCase().indexOf(search) !== -1)
        $(this).show();
    });

  });    
});
