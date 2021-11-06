const renderUpdateProduct = (id) => {
  const page = document.getElementById("page");
  page.innerHTML = ''
  const formRow = document.createElement("div");
  formRow.classList.add("row");
  formRow.classList.add("mt-5");
  formRow.classList.add("pt-5");
  formRow.classList.add("justify-content-center");
  formRow.classList.add("align-items-center");
  const formCol = document.createElement("div");
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
        <label class="form-label" for="availability">Availability: </label><br>
        <input class="w-100 form-control" type="date" name="availability">
      </fieldset>
      <fieldset>
      <label class="form-label" for="address">Address:</label><br>
      <input class="w-100 form-control" type="text" id="address" name="address"></input>
          <input type="hidden" id="lat" name="latitude" value=""></input>
          <input type="hidden" id="lng" name="longitude" value=""></input>
          <input type="hidden" id="formattedaddress" name="formattedaddress" value=""></input>
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
            <option value="Exercise">Exercise</option>
            <option value="Kitchen">Kitchen</option>
          </select>
      </fieldset>
      <fieldset>
        <label class="form-label"for="Price">Price: </label><br>
        <input class="w-100 form-control"type="number" name="price">
      </fieldset>
      
      <input type="submit" class="btn btn-blue w-100">
      `;

  
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      const formData = new FormData(form)
      const data = Object.fromEntries(formData.entries())
  
      axios.patch(`/api/users/products/${id}`, data).then((res) => {
        console.log(res.status(200))
        console.log("Product Updated")
        page.innerHTML = `<p>${message}/p>`
        setTimeout(function () {
          page.innerHTML = "";
          renderNavBar();
          renderHome();
        }, 1000);
      }).catch(err => {
        console.log("You need to be logged in")
      })
      renderHome()
    })
    formCol.appendChild(form);
    formRow.appendChild(formCol);
    page.appendChild(formRow);
    initAutocomplete('address');
  };