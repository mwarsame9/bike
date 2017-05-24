var Bike = require('./../js/bike.js').bikeModule;

var displayAllInfo = function(city, bikes) {
    bikes.forEach(function(bike) {
      $('.output').append(`<li style="cursor: pointer" class="bike-click" value="${bike.id}">${bike.title}</li>`);
  });
  $(".bike-click").click(function(){
    var bike = new Bike();
    var foundBikeId = $(this).val();
    bike.getBikeInfo(foundBikeId, displayBikeInfo);
  });
};



function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}





var displayBikeInfo = function(bike) {
  $('.bike-name').html(`<h1> ${bike.title} </h1> `);
    if (bike.description == null) {
      bike.description = "no description available";
    }
  $('.bike-name').append(`<li> Description: ${bike.description} </li> <li> Frame color: ${bike.frame_colors}</li> <li> Frame model: ${bike.frame_model}</li> <li style="color:blue;   text-decoration: underline;" id="view-image">View image</li> <li>Stolen from: ${bike.stolen_location}</li>`);
  if(bike.large_img == null) {
    $('#view-image').hide();
  }
  $('#view-image').click(function(){
      openInNewTab(bike.large_img);
  });
};





$(document).ready(function(){
  var bike = new Bike();
  $('#submit-button').click(function(){
    var city = $('#user-location').val();
    bike.getAllBikes(city, displayAllInfo);
  });



});
