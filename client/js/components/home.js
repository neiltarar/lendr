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
        <div class="row mt-5">
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
    <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
    <script src="https://maps.googleapis.com/maps/api/js?key={{env('GOOGLE_MAPS_API_KEY')}}&callback=initMap&v=weekly"
    async></script>
    `

    //https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple#maps_geocoding_simple-css
    //script to load api// https://stackoverflow.com/questions/60033669/call-google-maps-api-key-from-services-file

    // [START maps_geocoding_simple]
    let map;
    let marker;
    let geocoder;
    let responseDiv;
    let response;

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: { lat: -34.397, lng: 150.644 },
            mapTypeControl: false,
        });
        geocoder = new google.maps.Geocoder();

        const inputText = document.createElement("input");

        inputText.type = "text";
        inputText.placeholder = "Enter a location";

        const submitButton = document.createElement("input");

        submitButton.type = "button";
        submitButton.value = "Geocode";
        submitButton.classList.add("button", "button-primary");

        const clearButton = document.createElement("input");

        clearButton.type = "button";
        clearButton.value = "Clear";
        clearButton.classList.add("button", "button-secondary");
        response = document.createElement("pre");
        response.id = "response";
        response.innerText = "";
        responseDiv = document.createElement("div");
        responseDiv.id = "response-container";
        responseDiv.appendChild(response);

        const instructionsElement = document.createElement("p");

        instructionsElement.id = "instructions";
        instructionsElement.innerHTML =
            "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
        marker = new google.maps.Marker({
            map,
        });
        map.addListener("click", (e) => {
            geocode({ location: e.latLng });
        });
        submitButton.addEventListener("click", () =>
            geocode({ address: inputText.value })
        );
        clearButton.addEventListener("click", () => {
            clear();
        });
        clear();
    }

    function clear() {
        marker.setMap(null);
        responseDiv.style.display = "none";
    }

    function geocode(request) {
        clear();
        geocoder
            .geocode(request)
            .then((result) => {
                const { results } = result;

                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                marker.setMap(map);
                responseDiv.style.display = "block";
                response.innerText = JSON.stringify(result, null, 2);
                return results;
            })
            .catch((e) => {
                alert("Geocode was not successful for the following reason: " + e);
            });
    }
    // [END maps_geocoding_simple]

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
    
    //Single Product
    // productsContainer.innerHTML = `
    // <div class="product-single relative rounded"> 
    //     <a>
    //         <img width=388 height=250  src="./src/001.jpg" class="rounded-top" alt="Product Title"/>
    //         <div class="px-3 py-3">
    //         <p class="cat-tag">Category</p>
    //         <h4 class="pt-1 pb-1">Product Title</h4>
    //         <p class="pb-3"><span class="bold ">Available:</span> <span>1/11/2021 </span> </p>
    //         <button type="button" class="link" id="openConversation" data-toggle="modal" data-target="#exampleModal" onClick="renderConversation()" value="1">
    //             Contact Owner Name
    //         </button>
    //         <p class="price-tag text-end border-top pt-3"><span class="bold"> $35</span><span>/hour</span> </p>
    //         </div>
    //     </a>
    // </div>
    
    // `
    page.append(formRow);
    

    axios.get(`/api/products`).then((response) => { //showing all products
        console.log('data', response.data)
        response.data.forEach(product => {
            console.log(product);
            const productBox = document.createElement('div');
            
            productBox.className = 'productsBox';
            productBox.classList.add("product-single");
            productBox.classList.add("relative");
            productBox.classList.add("rounded");

            const productImage = document.createElement('a')
            
            productImage.innerHTML = `<button type="button" class="imageButton"><img width=388 height=250  src=${product.imageurl} class="rounded-top" alt="${product.name}"/></button>`;
            // const productImage = document.getElementById("productImage");
            if (productImage){
                productImage.addEventListener("click", (event) => { //takes us to product page
                    id = product["id"]
                    console.log(id)
    
                    axios.get(`/api/products/${id}`).then((response) => {
                        console.log(response)
                        productPage(id)
                    })
                })
    

            }
            productBox.append(productImage);

            const productInfo = document.createElement("div");

            productInfo.innerHTML = `
                <div class="px-3 py-3">
                <p class="cat-tag">${product.category}</p>
                <h4 class="pt-1 pb-1">${product.name}</h4>
                <p class="pb-3"><span class="bold ">Available:</span> <span>${product.availability} </span> </p>
                <button type="button" class="buttonlink" id="openConversation" onClick="renderConversation()" value="${product.id}">
                    Contact Owner
                </button>
                <p class="price-tag text-end border-top pt-3"><span class="bold"> $${product.price}</span><span>/hour</span> </p>
                </div>
            
            
            `
            productBox.append(productInfo);
            // const productName = document.createElement('h2')
            // productName.textContent = product["name"]
            // productBox.append(productName)

            
            
            // const productAddress = document.createElement('h3')
            // productAddress.textContent = product["address"]
            // productBox.append(productAddress)

            //Conversation button
            // const conversationButton = document.createElement("button");
            // conversationButton.textContent = "Contact Owner";
            // conversationButton.setAttribute("id", "contact-owner-button");
            // conversationButton.value = product["id"];
            // productBox.append(conversationButton);
            //open messages page
            const conversationButton = document.getElementById("contact-owner");
            if (conversationButton){
                conversationButton.addEventListener("click", (event) => {
                    const productId = product["id"];
                    renderConversation(productId);
                })

            }
            
            productsContainer.append(productBox);
            productsRow.append(productsContainer);
            page.append(productsRow);
        });
    });
};

