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
                        <div class="pac-card" id="pac-card">
                        <div>
                        <div id="title">Autocomplete search</div>
                        <div id="type-selector" class="pac-controls">
                            <input
                            type="radio"
                            name="type"
                            id="changetype-all"
                            checked="checked"
                            />
                            <label for="changetype-all">All</label>
                
                            <input type="radio" name="type" id="changetype-establishment" />
                            <label for="changetype-establishment">establishment</label>
                
                            <input type="radio" name="type" id="changetype-address" />
                            <label for="changetype-address">address</label>
                
                            <input type="radio" name="type" id="changetype-geocode" />
                            <label for="changetype-geocode">geocode</label>
                
                            <input type="radio" name="type" id="changetype-cities" />
                            <label for="changetype-cities">(cities)</label>
                
                            <input type="radio" name="type" id="changetype-regions" />
                            <label for="changetype-regions">(regions)</label>
                        </div>
                        <br />
                        <div id="strict-bounds-selector" class="pac-controls">
                            <input type="checkbox" id="use-location-bias" value="" checked />
                            <label for="use-location-bias">Bias to map viewport</label>
                
                            <input type="checkbox" id="use-strict-bounds" value="" />
                            <label for="use-strict-bounds">Strict bounds</label>
                        </div>
                        </div>
                        <div id="pac-container">
                        <input id="pac-input" type="text" placeholder="Enter a location" />
                        </div>
                    </div>
                    <div id="map"></div>
                    <div id="infowindow-content">
                        <span id="place-name" class="title"></span><br />
                        <span id="place-address"></span>
                    </div>
                    <!-- GoogleMaps -->
                    <script src="https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY&callback=initMap&libraries=places&v=weekly" async></script>
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
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 40.749933, lng: -73.98633 },
          zoom: 13,
          mapTypeControl: false,
        });
        const card = document.getElementById("pac-card");
        const input = document.getElementById("pac-input");
        const biasInputElement = document.getElementById("use-location-bias");
        const strictBoundsInputElement = document.getElementById("use-strict-bounds");
        const options = {
          fields: ["formatted_address", "geometry", "name"],
          strictBounds: false,
          types: ["establishment"],
        };
      
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
      
        const autocomplete = new google.maps.places.Autocomplete(input, options);
      
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo("bounds", map);
      
        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById("infowindow-content");
      
        infowindow.setContent(infowindowContent);
      
        const marker = new google.maps.Marker({
          map,
          anchorPoint: new google.maps.Point(0, -29),
        });
      
        autocomplete.addListener("place_changed", () => {
          infowindow.close();
          marker.setVisible(false);
      
          const place = autocomplete.getPlace();
      
          if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
      
          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
      
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          infowindowContent.children["place-name"].textContent = place.name;
          infowindowContent.children["place-address"].textContent =
            place.formatted_address;
          infowindow.open(map, marker);
        });
      
        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          const radioButton = document.getElementById(id);
      
          radioButton.addEventListener("click", () => {
            autocomplete.setTypes(types);
            input.value = "";
          });
        }
      
        setupClickListener("changetype-all", []);
        setupClickListener("changetype-address", ["address"]);
        setupClickListener("changetype-establishment", ["establishment"]);
        setupClickListener("changetype-geocode", ["geocode"]);
        setupClickListener("changetype-cities", ["(cities)"]);
        setupClickListener("changetype-regions", ["(regions)"]);
        biasInputElement.addEventListener("change", () => {
          if (biasInputElement.checked) {
            autocomplete.bindTo("bounds", map);
          } else {
            // User wants to turn off location bias, so three things need to happen:
            // 1. Unbind from map
            // 2. Reset the bounds to whole world
            // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
            autocomplete.unbind("bounds");
            autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
            strictBoundsInputElement.checked = biasInputElement.checked;
          }
      
          input.value = "";
        });
        strictBoundsInputElement.addEventListener("change", () => {
          autocomplete.setOptions({
            strictBounds: strictBoundsInputElement.checked,
          });
          if (strictBoundsInputElement.checked) {
            biasInputElement.checked = strictBoundsInputElement.checked;
            autocomplete.bindTo("bounds", map);
          }
      
          input.value = "";
        });
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

