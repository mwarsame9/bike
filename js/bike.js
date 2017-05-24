
function Bike() {

}


Bike.prototype.getAllBikes = function(city, displayAllInfo) {
  $.get(`https://bikeindex.org:443/api/v3/search?page=1&per_page=100&location="${city}"&distance=20&stolenness=proximity`).then(function(response){
  displayAllInfo(city, response['bikes']);

  }).fail(function(error) {
    $('#displayBikeInfo').text(error.responseJSON.message);
  });
};


Bike.prototype.getBikeInfo = function(bikeId) {
  $.get(`https://bikeindex.org:443/api/v3/bikes/${bikeId}`).then(function(response){
    displayBikeInfo(response.bike);
  });
};




exports.bikeModule = Bike;
