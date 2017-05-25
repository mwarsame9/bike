
function Bike() {

}


Bike.prototype.getAllBikes = function(city, displayAllInfo, getIds) {
  $.get(`https://bikeindex.org:443/api/v3/search?page=1&per_page=50&location="${city}"&distance=20&stolenness=proximity`).then(function(response){
  displayAllInfo(city, response['bikes']);
  }).fail(function(error) {
    $('.output').text(error.responseJSON.message);
  });
};


Bike.prototype.getBikeInfo = function(foundBikeId, displayBikeInfo,createMap) {
  $.get(`https://bikeindex.org:443/api/v3/bikes/${foundBikeId}`).then(function(response){
    displayBikeInfo(response.bike);
    createMap(response.bike.stolen_record.latitude, response.bike.stolen_record.longitude);
  }).fail(function(error) {
    $('.bike-info').text(error.responseJSON.message);
  });
};

Bike.prototype.createBigMap = function(ids) {
  $.get(`https://bikeindex.org:443/api/v3/bikes/${ids[0]}`).then(function(response){
    var place = {lat: response.bike.stolen_record.latitude, lng: response.bike.stolen_record.longitude};
    var bigMap = new google.maps.Map(document.getElementById('big-map'), {
      zoom: 8,
      center: place
    });
  ids.forEach(function(id){
    $.get(`https://bikeindex.org:443/api/v3/bikes/${id}`).then(function(response){
        var coords = {lat: response.bike.stolen_record.latitude, lng: response.bike.stolen_record.longitude};
        var marker = new google.maps.Marker({
          position: coords,
          map: bigMap
        });
        });
      });
    });
  };





exports.bikeModule = Bike;
