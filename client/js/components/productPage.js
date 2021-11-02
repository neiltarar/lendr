const productPage = (id) => {
    console.log(id)
    page.innerHTML = '';
    //Products div
    const productsRow = document.createElement('div');
    productsRow.classList.add('row');
    productsRow.classList.add('products-row');
    const productBox = document.createElement('div');
    productBox.className = 'productsBox';

    axios.get(`/api/products/${id}`).then((response) => {
        const product = response.data;
        const productName = document.createElement('h2');
        productName.textContent = product["name"];
        productBox.append(productName);

        // const productImage = document.createElement('image')
        // productName.textContent = product["name"]
        // productBox.append(productName)
        //ADDING THE PRODUCT IMAGE

        const productDescription = document.createElement('p');
        productDescription.textContent = product["description"];
        productBox.append(productDescription);
        const productAddress = document.createElement('h3');
        productAddress.textContent = product["address"];
        productBox.append(productAddress);
        ownerButton = document.createElement("button");
        ownerButton.innerHTML = `
        <button type="button" class="link" id="openConversation" data-toggle="modal" data-target="#exampleModal" onClick="renderMessages()" value="1">
                Contact Owner Name
            </button>
        `;
        
        // Add New Product Button
        const addNewProduct = document.createElement('button') //Add button to link to add product page
        addNewProduct.innerHTML = `<button type="button" class="button">Add Product</button`
        productBox.append(addNewProduct) //may need to append to different html element
        addNewProduct.addEventListener("click", (event) => {
            addNewProduct()
        });
        // Delete Product Button
        const deleteProduct = document.createElement('button'); //delete product
        productBox.append(deleteProduct); //may need to append to different html element
        deleteProduct.innerHTML = `<button type="button" class="button">Delete Product</button`;
        // Delete button event listener
        deleteProduct.addEventListener("click", (event) => {
            id = product["id"];
           
            axios.delete(`/api/users/products/${id}`).then((res) => {
                if (res.status === 200) {
                    page.innerHTML = `<p style="color: green">Product deleted</p>`;
                    setTimeout(function () {
                        page.innerHTML = "";
                        renderHome();
                    }, 1000)
                } else {
                    page.innerHTML = `<p style="color: red">You are not logged in</p>`;
                    setTimeout(function () {
                        page.innerHTML = "";
                        renderHome();
                    }, 1000)
                };
            });
        });
    });

    // --------------- REVIEW SECTION OF THE PRODUCT --------------------------------
    // Axios get request to get all reviews
    axios.get(`/api/products/reviews/${id}`).then((response) => {        
        const reviewForm = document.createElement("form");
        const productReview = response.data;
        console.log(productReview)
        productReview.forEach(productReview => {
            console.log(productReview.row)
            const review = document.createElement("p");
            review.innerText = productReview.row;
            productBox.append(review);
        });
        reviewForm.innerHTML = `
                <fieldset>
                    <label for="1star">1Star</label>
                    <input type="radio" id="1star" name="rating" value=1>
                    <label for="2star">2Star</label>
                    <input type="radio" id="1star" name="rating" value=2>
                    <label for="3star">3Star</label>
                    <input type="radio" id="3star" name="rating" value=3>
                    <label for="4star">4Star</label>
                    <input type="radio" id="4star" name="rating" value=4>
                    <label for="5star">5Star</label>
                    <input type="radio" id="5star" name="rating" value=5>
                </fieldset>
                <fieldset>
                    <input type="hidden" name="productId" value= ${id} </input>
                    <label for="review">review</label><br>
                    <input type="text" name="review">
                </fieldset>
                <input type="submit" value="post"></input>
                </div>
                `;
        productBox.append(reviewForm);
        // Review submit button event listener
        reviewForm.addEventListener("submit", (event) => {
            // preventDefault function prevents refreshing the page
            event.preventDefault();
            // capturing input data in the form
            const reviewData = new FormData(reviewForm);
            const data = Object.fromEntries(reviewData.entries());
            // making post request to see if the user exists in the db
            axios.post('/api/users/products/review', data) //endpoint
                .then((res) => {
                    console.log("review response: " + res)
                    page.innerHTML = '';
                    page.innerHTML = `<p style="color: green"> Review is submitted.</p>`;
                    setTimeout(function () {
                        productPage(id);
                    }, 1000);
                })
                .catch((err) => {
                    console.log("error: " + err)
                    console.log("review response: " + res)
                    // alert("You need to login to write a review");
                });
        });
    });    
    productsRow.append(productBox);
    page.append(productsRow);
};