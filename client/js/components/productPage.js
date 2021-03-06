const productPage = (id) => {
  page.innerHTML = "";
  //Products div
  const productsRow = document.createElement("div");
  productsRow.classList.add("row");
  productsRow.classList.add("products-row");
  const productBox = document.createElement("div");
  productBox.className = "productsBox col-12 relative";

  const productInfo = document.createElement("div");
  productInfo.classList.add("products-row");
  productBox.append(productInfo)

  axios.get(`/api/products/${id}`).then((response) => {
    const product = response.data;
    console.log("getting" + product);

    const productImage = document.createElement("img");
    productImage.classList.add("productPage-Image");
    productImage.src = "./src/images/001.jpg";
    productInfo.append(productImage);
    //ADDING THE PRODUCT IMAGE

    const productName = document.createElement("h1");
    productName.classList.add("mt-3");
    productName.classList.add("text-start");
    productName.textContent = product["name"];
    productInfo.append(productName);

    const productList = document.createElement("dl")
    productList.classList.add("productlist-row");
    productList.classList.add("text-start");
    productInfo.append(productList);

    const productDescription = document.createElement("dd");
    productDescription.classList.add("col-sm-12");
    productDescription.textContent = `Description: ${product["description"]}`;
    productList.append(productDescription);

    const productAddress = document.createElement("dd");
    productAddress.classList.add("col-sm-12")
    productAddress.textContent = `Location: ${product["formattedaddress"]}`
    productList.append(productAddress);

    const productAvailability = document.createElement("dd");
    productAvailability.classList.add("col-sm-12")
    productAvailability.textContent = `Availability: ${product["availability"]}`
    productList.append(productAvailability);

    ownerButton = document.createElement("button");
    ownerButton.innerHTML = `
        <button type="button" class="link" id="openConversation" data-toggle="modal" data-target="#exampleModal" onClick="renderMessages()" value="1">
                Contact Owner Name
            </button>
        `;
    //Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    productInfo.append(buttonContainer);

    // Update Product Button
    const updateProduct = document.createElement("button"); //Add button to link to add product page
    updateProduct.setAttribute("type", "button");
    updateProduct.textContent = "Update Product";
    updateProduct.classList.add("btn");
    updateProduct.classList.add("btn-blue");
    // updateProduct.innerHTML = `<button type="button" class="btn btn-blue">Update Product</button`
    buttonContainer.append(updateProduct); //may need to append to different html element
    updateProduct.addEventListener("click", (event) => {
      id = product["id"];
      console.log(id);
      axios.get(`/api/products/${id}`).then((response) => {
        console.log(response);
        renderUpdateProduct(id);
      });
    });
    // Delete Product Button
    const deleteProduct = document.createElement("button"); //delete product
    deleteProduct.classList.add("btn", "btn-outline-blue");
    buttonContainer.append(deleteProduct); //may need to append to different html element
    deleteProduct.innerText = `Delete Product`;

    const reviewContainer = document.createElement("div");
    productBox.append(reviewContainer);
    // Delete button event listener
    deleteProduct.addEventListener("click", (event) => {
      id = product["id"];
      console.log("deleted");

      axios.delete(`/api/users/products/${id}`).then((res) => {
        if (res.status === 200) {
          page.innerHTML = `<p style="color: green">Product deleted</p>`;
          setTimeout(function () {
            page.innerHTML = "";
            renderHome();
          }, 1000);
        } else {
          page.innerHTML = `<p style="color: red">You are not logged in</p>`;
          setTimeout(function () {
            page.innerHTML = "";
            renderHome();
          }, 1000);
        }
      });
    });
  });

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
      reviewElement.classList.add("text-left");
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
    <span class="stars-container stars-${starRatingRatio}">???????????????</span>
        `;

    // overallRating.innerText = ratingSum;
    reviewForm.innerHTML = `
    <fieldset class="star-rating">
    <input type="radio" name="rating" id="star-a" value="5"/>
    <label for="star-a"></label>

    <input type="radio" name="rating" id="star-b" value="4"/>
    <label for="star-b"></label>

    <input type="radio" name="rating" id="star-c" value="3"/>
    <label for="star-c"></label>

    <input type="radio" name="rating" id="star-d" value="2"/>
    <label for="star-d"></label>

    <input type="radio" name="ratin" id="star-e" value="1"/>
    <label for="star-e"></label>
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
};
