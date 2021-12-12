const renderNewProduct = () => {
  const page = document.getElementById("page");
  page.innerHTML = "";
  const formRow = document.createElement("div");
  formRow.classList.add("row");
  formRow.classList.add("mt-5");
  formRow.classList.add("pt-5");
  formRow.classList.add("justify-content-center");
  formRow.classList.add("align-items-center");
  const formCol = document.createElement("div");
  formCol.classList.add("col-md-6");
  const form = document.createElement("form");
  form.className = 'Form'
  form.innerHTML = `
      <form method="POST" action="/api/users/products/host" enctype="multipart/form-data">
        <div>
          <label class="form-label"for="name">Name:</label><br>
          <input class="w-100 form-control" type="text" name="name">
        </div>        
        <div>
          <label class="form-label" for="availability">Availability: </label><br>
          <input class="w-100 form-control" type="date" name="availability">
        </div>
        <div>
          <label class="form-label" for="address">Address:</label><br>
          <input class="w-100 form-control" type="text" id="address" name="address"></input>
              <input type="hidden" id="lat" name="latitude" value=""></input>
              <input type="hidden" id="lng" name="longitude" value=""></input>
              <input type="hidden" id="formattedaddress" name="formattedaddress" value="">
          </input>
        </div>
        <div>
        <label class="form-label" for="category">Choose a category: </label><br>
        <select class="form-select" name="category" id="category">
          <option value="Appliance">Appliance</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Exercise">Exercise</option>
          <option value="Kitchen">Kitchen</option>
        </select>
        </div>
        <div>
          <label class="form-label">Upload Product Image</label>
          <input class="w-100 form-control" type="file" name="product-image" />
        </div>
        <div>
          <label class="form-label"for="description">Description: </label><br>
          <input class="w-100 form-control" type="text" name="description">
        </div>
        <div>
          <label class="form-label"for="Price">Price: </label><br>
          <input class="w-100 form-control"type="number" name="price">
        </div>
        <div>
          <input onClick="renderNewProduct" type="submit" value="Upload" />
        </div>
      </form>
      `;

  formCol.appendChild(form);
  formRow.appendChild(formCol);
  page.appendChild(formRow);
  initAutocomplete("address");
};
