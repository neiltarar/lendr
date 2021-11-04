function renderHome() {
    axios.get(`/api/sessions`).then((res) => {
        const paragraph = document.getElementsByTagName("p")
        paragraph[0].innerHTML = `${res.data.message}`
        const username = res.data.username //giving us the username variable
        console.log(username)
        const userId = res.data.userId //giving us the userId variable
        console.log(userId)
    })
    const page = document.getElementById('page');
    // Clear the contents of the page element before we rerender the new content
    page.innerHTML = '';
    //Search Form 

    //Form div
    const formRow = document.createElement('div');
    formRow.classList.add('hero');
    formRow.innerHTML = `
    <div class="container"> 
        <div class="row">
            <div class="col-md-4 hero-col"> 
                <h1>Lorem ipsum </h1>
                <p>Lorem ipsum lorem ipsum lorem lorem </p>
                <form class="home-search mt-5">
                    <fieldset>
                        <input type="text" class="rounded" placeholder="Enter Product" />
                    </fieldset>
                    <fieldset>
                            <img class="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="">
                            <span class="sb-title">Address Selection</span>
                            <input type="text" placeholder="Address" id="location"/>
                            <input type="text" placeholder="Apt, Suite, etc (optional)"/>
                            <input type="text" placeholder="City" id="locality"/>
                            <input type="text" class="half-input" placeholder="State/Province" id="administrative_area_level_1"/>
                            <input type="text" class="half-input" placeholder="Zip/Postal code" id="postal_code"/>
                            <input type="text" placeholder="Country" id="country"/>
                            <button class="btn btn-primary rounded-pill">Checkout</button>
                        <div class="map" id="map"></div>
                        </div>
                        <script src="https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY&libraries=places&callback=initMap&channel=GMPSB_addressselection_v1_cABC" async defer></script>  
                    </fieldset>
                    <input type="search" class="btn btn-primary rounded-pill">
                </form>
            </div>
            <div class="col-md-8 d-flex justify-content-center  hero-col"> 
            </div>
        </div>
    </div>
    `
    "use strict";

    //https://jsfiddle.net/api/post/library/pure/
function initMap() {
  const componentForm = [
    'location',
    'locality',
    'administrative_area_level_1',
    'country',
    'postal_code',
  ];
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 37.4221, lng: -122.0841 },
    mapTypeControl: false,
    fullscreenControl: true,
    zoomControl: true,
    streetViewControl: true
  });
  const marker = new google.maps.Marker({map: map, draggable: false});
  const autocompleteInput = document.getElementById('location');
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });
  autocomplete.addListener('place_changed', function () {
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert('No details available for input: \'' + place.name + '\'');
      return;
    }
    renderAddress(place);
    fillInAddress(place);
  });

  function fillInAddress(place) {  // optional parameter
    const addressNameFormat = {
      'street_number': 'short_name',
      'route': 'long_name',
      'locality': 'long_name',
      'administrative_area_level_1': 'short_name',
      'country': 'long_name',
      'postal_code': 'short_name',
    };
    const getAddressComp = function (type) {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };
    document.getElementById('location').value = getAddressComp('street_number') + ' '
              + getAddressComp('route');
    for (const component of componentForm) {
      // Location field is handled separately above as it has different logic.
      if (component !== 'location') {
        document.getElementById(component).value = getAddressComp(component);
      }
    }
  }

  function renderAddress(place) {
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  }
}
    //Get search bar
    const searchBarButton = document.createElement("button")
    const searchForm = document.getElementsByClassName("home-search mt-5")
    console.log(searchForm)

    // searchForm.append(searchBarButton)
    searchBarButton.class = "btn btn-primary rounded-pill"
    searchBarButton.innerHTML = "Search"

    //Products div
    const productsRow = document.createElement('div');
    productsRow.classList.add('row');
    productsRow.classList.add('products-row');

    const productsContainer = document.createElement('div');
    productsContainer.classList.add('d-flex');
    productsContainer.classList.add('flex-wrap');
    productsRow.append(productsContainer);
    //Single Product
    productsContainer.innerHTML = `
    <div class="product-single relative rounded"> 
        <a>
            <img width=388 height=250  src="./src/001.jpg" class="rounded-top" alt="Product Title"/>
            <div class="px-3 py-3">
            <p class="cat-tag">Category</p>
            <h4 class="pt-1 pb-1">Product Title</h4>
            <p class="pb-3"><span class="bold ">Available:</span> <span>1/11/2021 </span> </p>
            <button type="button" class="link" id="openConversation" data-toggle="modal" data-target="#exampleModal" onClick="renderConversation()" value="1">
                Contact Owner Name
            </button>
            <p class="price-tag text-end border-top pt-3"><span class="bold"> $35</span><span>/hour</span> </p>
            </div>
        </a>
    </div>
    
    `
    page.append(formRow);
    page.append(productsRow);

    axios.get(`/api/products`).then((response) => { //showing all products
        console.log('data', response.data)
        response.data.forEach(product => {
            const productBox = document.createElement('div')
            productsContainer.append(productBox)
            productBox.className = 'productsBox'

            const productName = document.createElement('h2')
            productName.textContent = product["name"]
            productBox.append(productName)

            const productImage = document.createElement('a')
            productBox.append(productImage)
            productImage.innerHTML = `<button type="button" class="button">Product Page[Image]</button>`;
            productImage.addEventListener("click", (event) => { //takes us to product page
                id = product["id"]
                console.log(id)

                axios.get(`/api/products/${id}`).then((response) => {
                    console.log(response)
                    productPage(id)
                })
            })

            const productAddress = document.createElement('h3')
            productAddress.textContent = product["address"]
            productBox.append(productAddress)

            //Conversation button
            const conversationButton = document.createElement("button");
            conversationButton.textContent = "Contact Owner";
            conversationButton.setAttribute("id", "contact-owner-button");
            conversationButton.value = product["id"];
            productBox.append(conversationButton);
            //open messages page
            conversationButton.addEventListener("click", (event) => {
                const productId = product["id"];
                renderConversation(productId);
            })
        });
    });
};

