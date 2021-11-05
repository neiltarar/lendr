function initAutocomplete(addressFieldId) {
    const address = document.getElementById(addressFieldId);
    const autocomplete = new google.maps.places.Autocomplete(address);

    autocomplete.addListener('place_changed', function() {
      const place = autocomplete.getPlace();
      const latitude = place.geometry.location.lat();
      console.log(latitude)
      const longitude = place.geometry.location.lng();
      console.log(longitude)
      document.getElementById('lat').value = latitude;
      document.getElementById('lng').value = longitude;
      document.getElementById('formattedaddress').value = place["formatted_address"];
    });
  };