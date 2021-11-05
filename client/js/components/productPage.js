// const { default: axios } = require("axios");

const productPage = (id) => {
    page.innerHTML = '';
    //Products div
    const productsRow = document.createElement('div');
    productsRow.classList.add('row');
    productsRow.classList.add('products-row');
    const productBox = document.createElement('div');
    productBox.className = 'productsBox col-9 relative';

    axios.get(`/api/products/${id}`).then((response) => {

        const product = response.data;
        console.log(product)
        const productImage = document.createElement('img');
        productImage.classList.add("productPage-Image")
        productImage.src = product["imageurl"];
        productBox.append(productImage);
        //ADDING THE PRODUCT IMAGE

        const productName = document.createElement('h1');
        productName.classList.add("mt-3");
        productName.textContent = product["name"];
        productBox.append(productName);

        

        const productDescription = document.createElement('p');
        productDescription.classList.add("py-5");
        productDescription.textContent = product["description"];
        productBox.append(productDescription);
        const productAddress = document.createElement('p');
        productAddress.innerHTML = `<span class="bold">Available:</span>${product["address"]}`;
        productBox.append(productAddress);
        ownerButton = document.createElement("button");
        ownerButton.innerHTML = `
        <button type="button" class="link" id="openConversation" data-toggle="modal" data-target="#exampleModal" onClick="renderMessages()" value="1">
                Contact Owner Name
            </button>
        `;

        //Button container 
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        productBox.append(buttonContainer);
        // Update Product Button
        const updateProduct = document.createElement('button') //Add button to link to add product page
        updateProduct.setAttribute("type", "button");
        updateProduct.textContent = "Update Product";
        updateProduct.classList.add("btn");
        updateProduct.classList.add("btn-blue");
        // updateProduct.innerHTML = `<button type="button" class="btn btn-blue">Update Product</button`
        buttonContainer.append(updateProduct) //may need to append to different html element
        updateProduct.addEventListener("click", (event) => {
            id = product["id"]
            console.log(id)

            axios.get(`/api/products/${id}`).then((response) => {
                console.log(response)
                renderUpdateProduct(id)
            })

        });
        // Delete Product Button
        const deleteProduct = document.createElement('button'); //delete product
        deleteProduct.classList.add("btn", "btn-outline-blue");
        buttonContainer.append(deleteProduct); //may need to append to different html element
        deleteProduct.innerText = `Delete Product`;
        productBox.append(reviewContainer);
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
    const reviewContainer = document.createElement("div");
    reviewContainer.classList.add("reviews")
    const reviewTitle = document.createElement("h2");
    reviewTitle.textContent = "Product Reviews";
    reviewContainer.append(reviewTitle);
    

    axios.get(`/api/products/reviews/${id}`).then((response) => {
        const reviewForm = document.createElement("form");
        const overallRating = document.createElement("p");
        const reviewUl = document.createElement("ul");
        reviewUl.classList.add("list-group", "list-group-flush");
        reviewContainer.append(overallRating);
        const productReview = response.data;
        const reviewRatings = [];
        productReview.forEach(review => {
            const productReviewDateTime = review.row.split(",")[0].replace(/['"]+/g, '');
            const productReview = review.row.split(",")[1].replace(/['"]+/g, '');
            const productReviewRating = review.row.split(",")[2].replace(/['")]+/g, '');
            reviewRatings.push(parseInt(productReviewRating));
            const reviewElement = document.createElement("li");
            reviewElement.classList.add("list-group-item", "py-4");
            reviewElement.innerText = productReview;
            reviewUl.append(reviewElement);
            
        });
        reviewContainer.append(reviewUl)
        const ratingTotal = reviewRatings.reduce((curr, acc) => {
                acc += curr
                return acc
            },0);
        ratingSum = ratingTotal/reviewRatings.length;
        overallRating.innerText = ratingSum;
        reviewForm.innerHTML = `
                <fieldset>
                    <label for="1star" class="form-check-label">1Star</label>
                    <input type="radio" class="form-check-input" id="1star" name="rating" value=1>
                    <label for="2star" class="form-check-label">2Star</label>
                    <input type="radio" class="form-check-input" id="1star" name="rating" value=2>
                    <label for="3star" class="form-check-label">3Star</label>
                    <input type="radio" class="form-check-input" id="3star" name="rating" value=3>
                    <label for="4star" class="form-check-label">4Star</label>
                    <input type="radio" class="form-check-input" id="4star" name="rating" value=4>
                    <label for="5star" class="form-check-label">5Star</label>
                    <input type="radio" class="form-check-input" id="5star" name="rating" value=5>
                </fieldset>
                <fieldset>
                    <input type="hidden" name="productId" value= ${id} </input>
                    <label for="review" class="form-label">Review</label><br>
                    <input type="text" class="form-control w-100"  name="review" placeholder="Write your review">
                </fieldset>
                <input type="submit" class="btn btn-blue"  value="Submit Review"></input>
                </div>
                `;
        reviewContainer.append(reviewForm);
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