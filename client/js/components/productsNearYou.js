const productsNearYou = (data) => {

    const page = document.getElementById('page');
    // Clear the contents of the page element before we rerender the new content
    page.innerHTML = '';
    //Search Form 

    //Form div
    const formRow = document.createElement('div');
    formRow.classList.add('hero');
    const form = document.createElement("form");
    form.className = 'Form'
    formRow.append(form)

    form.innerHTML = `
    <div class="container"> 
        <div class="row">
            <div class="col-md-4 hero-col"> 
                <h1>Lorem ipsum </h1>
                <p>Lorem ipsum lorem ipsum lorem lorem </p>
            </div>
        </div>
    </div>
    `;

    //Products div
    const productsRow = document.createElement('div');
    productsRow.classList.add('row');
    productsRow.classList.add('products-row');

    const productsContainer = document.createElement('div');
    productsContainer.classList.add('d-flex');
    productsContainer.classList.add('flex-wrap');
    productsRow.append(productsContainer);

    page.append(formRow);
    page.append(productsRow);

    axios.get(`/api/products`).then((response) => { //showing all products
        console.log('data', response.data)

        let userLng = data["lng"]
        let userLat = data["lat"]
        let userReqItem = data["item"]

        response.data.forEach(product => {
            const productBox = document.createElement('div')
            productBox.className = 'productsBox';
            productBox.classList.add("product-single");
            productBox.classList.add("relative");
            productBox.classList.add("rounded");

            const productTitle = product["name"]
            const firstLetterProduct = productTitle.substring(0, 1)
            const firstLetterItem = userReqItem.substring(0, 1)

            if (firstLetterProduct === firstLetterItem) {
                console.log("match found")
                const productName = document.createElement('h2')
                productName.textContent = productTitle
                productBox.append(productName)

                console.log(productTitle.substring(0, 1));

                const productLongitude = product["longitude"]
                const productLatitude = product["latitude"]

                distanceAway = (distance(userLat, userLng, productLatitude, productLongitude))


                const productImage = document.createElement('a')
                productBox.append(productImage)
                productImage.innerHTML = `<button type="button" class="imageButton"><img width=388 height=250  src="./src/images/001.jpg" class="rounded-top" alt="lawn mover"/></button>`;
                
                if (productImage) {
                    productImage.addEventListener("click", (event) => { //takes us to product page
                        id = product["id"]
                        console.log(id)

                        axios.get(`/api/products/${id}`).then((response) => {
                            console.log(response)
                            productPage(id)
                        });
                    });
                }
                productBox.append(productImage);

                const productInfo = document.createElement("div");

                productInfo.innerHTML = `
                            <div class="px-3 py-3">
                            <p class="cat-tag">${product.category}</p>
                            <h4 class="pt-1 pb-1">${product.name}</h4>
                            <h4 class="pt-1 pb-1">${distanceAway} km</h4>
                            <p class="pb-3"><span class="bold ">Available:</span> <span>${product.availability} </span> </p>
                            <button type="button" class="buttonlink" id="openConversation" onClick="renderConversation()" value="${product.id}">
                                Contact Owner
                            </button>
                            <p class="price-tag text-end border-top pt-3"><span class="bold"> $${product.price}</span><span>/hour</span> </p>
                            </div> 
                        `;
                productBox.append(productInfo);

                const conversationButton = document.getElementById("contact-owner");
                if (conversationButton) {
                  conversationButton.addEventListener("click", (event) => {
                    const productId = product["id"];
                    renderConversation(productId);
                  });
                }
            } else {
                console.log("keep looking")
            };
            productsContainer.append(productBox);
            productsRow.append(productsContainer);
            page.append(productsRow);
        });
    });
};
