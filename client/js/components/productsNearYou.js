const productsNearYou = (data, longitude, latitude) => {
    const page = document.getElementById('page');
    page.innerHTML = '';

    const searchResultsDiv = document.createElement('div');
    searchResultsDiv.classList.add('hero');
    const searchResults = document.createElement("form");
    searchResults.className = 'Form'
    searchResultsDiv.append(searchResults)

    searchResults.innerHTML = `
    <div class="container"> 
        <div class="row">
            <div class="col-md-4 hero-col"> 
                <h1>Lorem ipsum </h1>
                <p>Lorem ipsum lorem ipsum lorem lorem </p>
            </div>
            <div class="col-md-8 d-flex justify-content-center  hero-col"> 
            </div>
        </div>
    </div>
    `;
  
    //Products div
    const productsRow = document.createElement('div');
    productsRow.classList.add('row');
    productsRow.classList.add('products-row');
    const productBox = document.createElement('div');
    productBox.className = 'productsBox';

    // axios.get(`/api/products/closeby`).then((response) => { //showing all products
    //     console.log('data', response.data)
    //     response.data.forEach(product => {
    //         const productBox = document.createElement('div')
    //         productsContainer.append(productBox)
    //         productBox.className = 'productsBox'

    //         const productName = document.createElement('h2')
    //         productName.textContent = product["name"]
    //         productBox.append(productName)

    //         const productImage = document.createElement('a')
    //         productBox.append(productImage)
    //         productImage.innerHTML = `<button type="button" class="button">Product Page[Image]</button>`;
    //         productImage.addEventListener("click", (event) => { //takes us to product page
    //             id = product["id"]
    //             console.log(id)

    //             axios.get(`/api/products/${id}`).then((response) => {
    //                 console.log(response)
    //                 productPage(id)
    //             })
    //         })

    //         const productAddress = document.createElement('h3')
    //         productAddress.textContent = product["address"]
    //         productBox.append(productAddress)

    //         //Conversation button
    //         const conversationButton = document.createElement("button");
    //         conversationButton.textContent = "Contact Owner";
    //         conversationButton.setAttribute("id", "contact-owner-button");
    //         conversationButton.value = product["id"];
    //         productBox.append(conversationButton);
    //         //open messages page
    //         conversationButton.addEventListener("click", (event) => {
    //             const productId = product["id"];
    //             renderConversation(productId);
    //         })
    //     });
    // });
    page.append(searchResultsDiv)
    productsRow.append(productBox);
    page.append(productsRow);
};
