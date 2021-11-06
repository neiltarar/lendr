const renderUpdateProduct = (id) => {
    const page = document.getElementById("page");
    page.innerHTML = ''
  
    const form = document.createElement("form");
    form.className = 'Form'
    form.innerHTML = `
        <fieldset>
          <label for="name">Name:</label><br>
          <input type="text" name="name">
        </fieldset>
        <fieldset>
          <label for="description">Description:</label><br>
          <input type="text" name="description">
        </fieldset>
        <fieldset>
          <label for="address">Address:</label><br>
          <input type="text" name="address">
        </fieldset>
        <fieldset>
          <label for="availability">Availability: </label><br>
          <input type="date" name="availability">
        </fieldset>
        <fieldset>
          <label for="image">Image: </label><br>
          <input type="text" name="image">
        </fieldset>
        <fieldset>
          <label for="category">Choose a category: </label><br>
            <select name="category" id="category">
              <option value="Appliance">Appliance</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Exercise">Exericse</option>
              <option value="Kitchen">Kitchen</option>
            </select>
        </fieldset>
        <fieldset>
          <label for="Price">Price: </label><br>
          <input type="number" name="price">
        </fieldset>
        <input type="submit" class="button">
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
    page.replaceChildren(form);
  };