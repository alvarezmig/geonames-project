
//Preloader function
$(window).on('load', function() {
  $('#preloader').fadeOut('slow', function() {
    $(this).remove();
  });
});


$(function (){

  //Clear results function
  function clear(){
    if($('#results').has('li')){
      $('#results').empty();
     }
   }

  $('#streetSubmit').on('click', function(){

    clear();

    $.ajax({
      type: 'POST',
      url: 'resources/php/streetName.php',
      dataType: 'JSON',
      data: {
        road: $('#road').val(),
        city: $('#city').val()
      },

      beforeSend: function(){
        $('.imgLoad').show();
      },

      complete: function(){
      $('.imgLoad').hide();
      },

      success: function(data) {

        //console.log(data);
        clear();
        //iterates through data to print 5 entries.
        for(let i = 0; i < 5; i++){ 
        let results = data.address[i].street;
        $('#results').append('<li>' + results + '</li>');
         }
      },

      error: function(){
          alert('Error retrieving information');
      }
    })
   })

  $('#wikiSubmit').on('click', function(){
    if($('#wikiTerm').val().length === 0) {

      alert('Please insert a search term')

    }else{

    clear();

    $.ajax({
      type: 'POST',
      url: 'resources/php/wikipedia.php',
      dataType: 'JSON',
      data: {
        wikiTerm: $('#wikiTerm').val()
      },

      beforeSend: function(){
        $('.imgLoad').show();
      },

      complete: function(){
        $('.imgLoad').hide();
      },

      success: function(data) {

        console.log(data) 
        clear();
        //iterates through data to print 5 entries.
        for(let i = 0; i < 5; i++){
          let results = data.geonames[i].summary;
          $('#results').append('<li>' + results + '</li>');
        }
      },

      error: function(){
          alert('Error retrieving information');
      },
    })
   }
   })

  $('#submitTimezone').on('click', function(){

    clear();

    $.ajax({
      type: 'POST',
      url: 'resources/php/timezone.php',
      dataType: 'JSON',
      data: {
        latlng: $('#location').val()
      },

      beforeSend: function(){
        $('.imgLoad').show();
      },

      complete: function(){
        $('.imgLoad').hide();
      },

      success: function(data){

        //console.log(data);
        clear();
        $('#results').append(
          '<li> Country Name: ' + data.countryName + '</li>',
          '<li> Current time: ' + data.time + '</li>',
          '<li> Timezone: ' + data.timezoneId + '</li>',
          '<li> Sunrise today: ' + data.sunrise+ '</li>',
          '<li> Sunset today: ' + data.sunset + '</li>',
        );
      },
      error: function(){
          alert('Error retrieving information')
      }
    })
  })
});