function initAutocomplete() {
  const address = document.getElementById('address');
  console.log(address)
  const autocomplete = new google.maps.places.Autocomplete(address);

  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace();
    console.log(place)
    const latitude = place.geometry.location.lat();
    console.log(latitude)
    const longitude = place.geometry.location.lng();
    document.getElementById('lat').value = latitude;
    document.getElementById('lng').value = longitude;
  });
};