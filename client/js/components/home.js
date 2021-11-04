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
                    <div id="map"></div>
                </form>
                <input type="Submit" class="btn btn-primary rounded-pill">
            </div>
            <div class="col-md-8 d-flex justify-content-center  hero-col"> 
            </div>
        </div>
    </div>
    `
    // // <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
    // <script src="https://maps.googleapis.com/maps/api/js?key={{env('GOOGLE_MAPS_API_KEY')}}&callback=initMap&v=weekly" async></script>

    // //https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple#maps_geocoding_simple-css
    // //script to load api// https://stackoverflow.com/questions/60033669/call-google-maps-api-key-from-services-file

    // // [START maps_geocoding_simple]
    // var map;
    // var service;
    // var infowindow;
    
    // function initMap() {
    //   var sydney = new google.maps.LatLng(-33.867, 151.195);
    
    //   infowindow = new google.maps.InfoWindow();
    
    //   map = new google.maps.Map(
    //       document.getElementById('map'), {center: sydney, zoom: 15});
    
    //   var request = {
    //     query: 'Museum of Contemporary Art Australia',
    //     fields: ['name', 'geometry'],
    //   };
    
    //   var service = new google.maps.places.PlacesService(map);
    
    //   service.findPlaceFromQuery(request, function(results, status) {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       for (var i = 0; i < results.length; i++) {
    //         createMarker(results[i]);
    //       }
    //       map.setCenter(results[0].geometry.location);
    //     }
    //   });
    // }
    // // [END maps_geocoding_simple]

    //Get search bar
    const searchBarButton = document.getElementsByClassName("btn btn-primary rounded-pill")
    console.log(searchBarButton)
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

