
var Bike = require('./../js/bike.js').bikeModule;

var displayAllInfo = function(city, bikes) {
    getIds(bikes);
    $('.output').empty()
    bikes.forEach(function(bike) {
      $('.output').append(`<li style="cursor: pointer" class="bike-click" value="${bike.id}">${bike.title}</li>`);
  });
  $(".bike-click").click(function(){
    $('#big-map-div').hide();
    $('#map-div').show();
    var bike = new Bike();
    var foundBikeId = $(this).val();
    bike.getBikeInfo(foundBikeId, displayBikeInfo, createMap);
  });
};

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

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


function createMap(latitude,longitude) {
  var uluru = {lat: latitude, lng: longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: 'img/icon4.png'
  });
}



function getIds(bikes) {
  var bike = new Bike();
  var ids = [];
  bikes.forEach(function(bike){
    ids.push(bike.id);
  });
  bike.createBigMap(ids);
}




$(document).ready(function(){
  $('#map-div').hide();
  $('.output').hide();
  var bike = new Bike();
  $('#submit-button').click(function(e){
    e.preventDefault();
    $('#big-map-div').show();
    $('.output').fadeIn(2000);
    var city = $('#user-location').val();
    bike.getAllBikes(city, displayAllInfo, getIds);
  });
});
