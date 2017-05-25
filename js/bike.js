
function Bike() {

}


Bike.prototype.getAllBikes = function(city, displayAllInfo) {
  $.get(`https://bikeindex.org:443/api/v3/search?page=1&per_page=100&location="${city}"&distance=20&stolenness=proximity`).then(function(response){
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




exports.bikeModule = Bike;
