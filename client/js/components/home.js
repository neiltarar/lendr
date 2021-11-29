function renderHome() {
  const page = document.getElementById("page");
  // Clear the contents of the page element before we rerender the new content
  page.innerHTML = "";

  axios.get(`/api/sessions`).then((res) => {
    const paragraph = document.getElementsByTagName("p");
    paragraph[0].innerHTML = `${res.data.message}`;
    const username = res.data.username; //giving us the username variable
    console.log(username);
    const userId = res.data.userId; //giving us the userId variable
    console.log(userId);
  });

  //Form div
  const formRow = document.createElement("div");
  formRow.classList.add("hero");
  const form = document.createElement("form");
  form.className = "Form";
  formRow.append(form);

  form.innerHTML = `
    <div class="container"> 
        <div class="row mt-5">
            <div class="col-md-4 hero-col"> 
                <h1>Lorem ipsum </h1>
                <p>Lorem ipsum lorem ipsum lorem lorem </p>
                <form class="home-search mt-5">
                    <fieldset>
                    <fieldset>
                      <label class="form-label"for="name">Name:</label><br>
                      <input class="w-100 form-control" placeholder="Find item" type="text" name="item">
                    </fieldset>
                    <fieldset>
                      <label class="form-label" for="address">Address:</label><br>
                      <input class="w-100 form-control" type="text" id="address" name="address"></input>
                            <input type="hidden" id="lat" value="" name="lat"></input>
                            <input type="hidden" id="lng" value="" name="lng"></input>
                            <input type="hidden" id="formattedaddress" value="">
                    </fieldset>
                </form>
                <input type="Submit" class="btn btn-primary rounded-pill">
            </div>
            <div class="col-md-8 d-flex justify-content-center  hero-col"> 
            </div>
        </div>
    </div>
    `;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data["item"]);

    if (data["item"] === undefined || data["item"] === "") {
      console.log("not defined");
      alert("Could not find item");
      renderHome();
    } else {
      productsNearYou(data);
      console.log("getting products near you!");
    }
  });

  //Products div
  const productsRow = document.createElement("div");
  productsRow.classList.add("row");
  productsRow.classList.add("products-row");
  const productsContainer = document.createElement("div");
  productsContainer.classList.add("d-flex");
  productsContainer.classList.add("flex-wrap");

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

  axios.get(`/api/products`).then((response) => {
    //showing all products
    console.log("data", response.data);
    response.data.forEach((product) => {
      console.log(product);
      const productBox = document.createElement("div");

      productBox.className = "productsBox";
      productBox.classList.add("product-single");
      productBox.classList.add("relative");
      productBox.classList.add("rounded");

      const productImage = document.createElement("a");

      productImage.innerHTML = `<button type="button" class="imageButton"><img width=388 height=250  src="./src/images/001.jpg" class="rounded-top" alt="lawn mover"/></button>`;
      // const productImage = document.getElementById("productImage");
      if (productImage) {
        productImage.addEventListener("click", (event) => {
          //takes us to product page
          id = product["id"];
          console.log(id);

          axios.get(`/api/products/${id}`).then((response) => {
            console.log(response);
            productPage(id);
          });
        });
      }
      productBox.append(productImage);

      const productInfo = document.createElement("div");

      productInfo.innerHTML = `
                <div class="px-3 py-3">
                <p class="cat-tag">${product.category}</p>
                <h4 class="pt-1 pb-1">${product.name}</h4>
                <p class="pb-3"><span class="bold ">Available:</span> <span>${product.availability} </span> </p>
                <button type="button" class="buttonlink" id="openConversation" onClick="renderConversation(${product.id})" value="${product.id}">
                    Contact Owner
                </button>
                <p class="price-tag text-end border-top pt-3"><span class="bold"> $${product.price}</span><span>/hour</span> </p>
                </div>
            
            
            `;
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
      if (conversationButton) {
        conversationButton.addEventListener("click", (event) => {
          const productId = product["id"];
          renderConversation(productId);
        });
      }

      productsContainer.append(productBox);
      productsRow.append(productsContainer);
      page.append(productsRow);
    });
  });

  initAutocomplete("address");
}
