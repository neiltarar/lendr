const renderNewProduct = () => {
  const page = document.getElementById("page");
  page.innerHTML = ''

  const form = document.createElement("form");
  form.className = 'Form'
  form.innerHTML = `
      <fieldset>
        <label for="name">Name:</label><br>
        <input type="text" placeholder="name" name="name">
      </fieldset>
      <fieldset>
        <label for="description">Description:</label><br>
        <input type="text" placeholder="description" name="description">
      </fieldset>
      <fieldset>
        <label for="availability">Availability: </label><br>
        <input type="date" name="availability">
      </fieldset>
      <fieldset>
        <label for="address">Address:</label><br>
          <input type="text" id="address">
          <input type="hidden" id="lat" name="latitude" value="">
          <input type="hidden" id="lng" name="longitude" value="">
          <input type="hidden" id="formattedaddress" name="formattedaddress" value="">
      </fieldset>
      <fieldset>
        <label for="image">Image: </label><br>
        <input type="text" placeholder="image" name="image">
      </fieldset>
      <fieldset>
        <label for="category">Choose a category: </label><br>
          <select name="category" id="category">
            <option value="Appliance">Appliance</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Exercise">Exercise</option>
            <option value="Kitchen">Kitchen</option>
          </select>
      </fieldset>
      <fieldset>
        <label for="Price">Price/hr: </label><br>
        <input type="number" placeholder="price" name="price">
      </fieldset>
      <input type="submit" class="button">
      `;

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    axios.post(`/api/users/products/host`, data).then((res) => {
      console.log("Product Added")
      page.innerHTML = `<p style="color: green">Product successfully added!</p>`;
      setTimeout(function () {
        page.innerHTML = "";
        renderLoggednavBar();
        renderHome();
      }, 1000);
    }).catch(err => {
      console.log("You need to be logged in")
      page.innerHTML = `<p style="color: red">You need to be logged in to add a product</p>`;
      setTimeout(function () {
        page.innerHTML = "";
        renderNavBar();
        renderHome();
      }, 1000);
    })
    renderHome()
  })
  page.replaceChildren(form);
  initAutocomplete('address');
};