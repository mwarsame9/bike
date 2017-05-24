var Bike = require('./../js/bike.js').bikeModule;

var displayAllInfo = function(city, bikes) {
    bikes.forEach(function(bike) {
    $('.output').append(`<li id="bike-click"> <a href="bike.html">${bike.title}</a> </li>`);
    $('#bike-click').click(function(){
      var bike = new Bike();
      bike.getBikeInfo(bike.id);
    });
  });
};

var displayBikeInfo = function(bike) {
  $('#bike-info').text(`<p> ${bike.title} </p>`);
};




$(document).ready(function(){
  var bike = new Bike();
  $('#submit-button').click(function(){
    var city = $('#user-location').val();
    bike.getAllBikes(city, displayAllInfo);
  });
});
