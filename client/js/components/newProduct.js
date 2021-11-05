const renderNewProduct = () => {
  const page = document.getElementById("page");
  page.innerHTML = ''
  const formRow = document.createElement("div");
    formRow.classList.add("row");
    formRow.classList.add("mt-5");
    formRow.classList.add("pt-5");
    formRow.classList.add("justify-content-center");
    formRow.classList.add("align-items-center");
    const formCol= document.createElement("div");
    formCol.classList.add("col-6");
  const form = document.createElement("form");
  form.className = 'Form'
  form.innerHTML = `
      <fieldset>
        <label class="form-label"for="name">Name:</label><br>
        <input class="w-100 form-control" type="text" name="name">
      </fieldset>
      <fieldset>
        <label class="form-label" for="description">Description:</label><br>
        <input class="w-100 form-control" type="text" name="description">
      </fieldset>
      <fieldset>
        <label class="form-label" for="address">Address:</label><br>
        <input class="w-100 form-control" type="text" name="address">
      </fieldset>
      <fieldset>
        <label class="form-label" for="availability">Availability: </label><br>
        <input class="w-100 form-control" type="date" name="availability">
      </fieldset>
      <fieldset>
        <label class="form-label" for="image">Image: </label><br>
        <input class="w-100 form-control" type="text" name="image">
      </fieldset>
      <fieldset>
        <label class="form-label" for="category">Choose a category: </label><br>
          <select class="form-select" name="category" id="category">
            <option value="Appliance">Appliance</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Exercise">Exericse</option>
            <option value="Kitchen">Kitchen</option>
          </select>
      </fieldset>
      <fieldset>
        <label class="form-label"for="Price">Price: </label><br>
        <input class="w-100 form-control"type="number" name="price">
      </fieldset>
      
      <input type="submit" class="btn btn-primary w-100">
      `;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // const image = await getBase64(data.UploadImage);
      const { name, description, availability, image, address, category, price } = data;
      const res = await axios.post(`/api/users/products/host`, {
        name,
        description,
        availability,
        address,
        image,
        category,
        price
      });

      page.innerHTML = `<p style="color: green">Product successfully added!</p>`;
      setTimeout(function () {
        page.innerHTML = "";
        renderLoggednavBar();
        renderHome();
      }, 1000);
    } catch (error) {
      console.log("You need to be logged in")
      page.innerHTML = `<p style="color: red">You need to be logged in to add a product</p>`;
      setTimeout(function () {
        page.innerHTML = "";
        renderNavBar();
        renderHome();
      }, 1000);
    }
    renderHome();
  })
  // page.replaceChildren(form);
  formCol.appendChild(form);
    formRow.appendChild(formCol);
    page.appendChild(formRow);
};

//Convert images 
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}