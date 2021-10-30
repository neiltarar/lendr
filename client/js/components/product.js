function renderProduct() {
    const page = document.getElementById('page');
    // Clear the contents of the page element before we rerender the new content
    page.innerHTML = '';
    // Create new elemet to render the product inside
    const product = document.createElement('div');
    const reviewForm = document.createElement('form');
    product.classList.add('hero');
    reviewForm.classList.add('hero');
    product.innerHTML = `
    <div>
        <img width=388 height=250  src="./src/001.jpg" class="rounded-top" alt="Product Title"/>
        <div class="px-3 py-3">
        <p class="cat-tag">Category</p>
        <h4 class="pt-1 pb-1" onClick="renderProduct()">Product Title</h4>
        <p class="pb-3"><span class="bold ">Available:</span> <span>1/11/2021 </span> </p>
        <p> Description </p>
        <p class="price-tag text-end border-top pt-3"><span class="bold"> $35</span><span>/hour</span> </p>
    </div>
    `;

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
        <label for="review">review</label><br>
        <input type="text" name="review">
    </fieldset>
    <input type="submit" value="post"></input>
    </div>
    `;

    page.appendChild(product);
    page.appendChild(reviewForm);

    reviewForm.addEventListener("submit" , (event) => {
        // preventDefault function prevents refreshing the page
        event.preventDefault();
        // capturing input data in the form
        const reviewData = new FormData(reviewForm);
        const data = Object.fromEntries(reviewData.entries());
        console.log(data);
        // making post request to see if the user exists in the db
        axios.post('/api/products/review' , data) //endpoint
            .then((res) => {
                page.innerHTML = '';
            })
            .catch((err) => {
                alert("You need to login to write a review");
            });
    });
    
};

