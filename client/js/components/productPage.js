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

  // --------------- REVIEW SECTION OF THE PRODUCT --------------------------------
  // Axios get request to get all reviews
  axios.get(`/api/products/reviews/${id}`).then((response) => {
    const reviewForm = document.createElement("form");
    const overallRating = document.createElement("h1");
    const reviewUl = document.createElement("ul");
    reviewUl.classList.add("reviews");
    reviewUl.classList.add("list-group", "list-group-flush");
    productBox.appendChild(overallRating);
    const productReview = response.data;
    // We want to get all the ratings for the product and divide it to the sum of the reviews to get the average rating
    const reviewRatings = [];
    productReview.forEach((review) => {
      const productReviewDateTime = review.row
        .split(",")[1]
        .split(" ")[0]
        .replace(/['"]+/g, "");
      const productReview = review.row.split(",")[2].replace(/['"]+/g, "");
      const productReviewRating = review.row
        .split(",")[3]
        .replace(/['")]+/g, "");
      if (productReviewRating !== NaN) {
        reviewRatings.push(parseInt(productReviewRating));
      }
      const reviewElement = document.createElement("li");
      reviewElement.classList.add("list-group-item");
      reviewElement.innerHTML = `<span class="reviewDateTime">${productReviewDateTime}</span> <br><br> ${productReview}`;
      reviewUl.append(reviewElement);
    });

    productBox.append(reviewUl);
    const ratingTotal = reviewRatings.reduce((curr, acc) => {
      acc += curr;
      return acc;
    }, 0);
    ratingSum = ratingTotal / reviewRatings.length;
    // If there is no rating it changes the value to 0 from NaN
    if (!ratingSum) {
      ratingSum = 0;
    }
    starRatingRatio = Math.ceil((ratingSum * 100) / 5);
    if (starRatingRatio - Math.floor(starRatingRatio / 10) * 10 > 4) {
      starRatingRatio = Math.ceil(starRatingRatio / 10) * 10;
    } else {
      starRatingRatio = parseInt(starRatingRatio / 10, 10) * 10;
    }
    overallRating.innerHTML = `
    <span class="stars-container stars-${starRatingRatio}">★★★★★</span>
        `;

    // overallRating.innerText = ratingSum;
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
                <fieldset class="reviews">
                    <input type="hidden" name="productId" value= ${id} </input>

                    <textarea type="text" name="review" class="reviewInput" rows="4" cols="50"></textarea>
                </fieldset>
                <input type="submit" value="post" class="reviews btn btn-primary"></input>
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
      // with if condition we are preventing an empty review to be posted
      if (data["review"] !== "") {
        axios
          .post("/api/users/products/review", data) //endpoint
          .then((res) => {
            page.innerHTML = "";
            page.innerHTML = `<p style="color: green"> Review is submitted.</p>`;
            setTimeout(function () {
              productPage(id);
            }, 1000);
          })
          .catch((err) => {
            console.log("error: " + err);
            console.log("review response: " + res);
            alert("You need to login to write a review");
          });
      } else {
        alert("You can't post an empty review!");
      }
    });
    productsRow.append(productBox);
    page.append(productsRow);
  });