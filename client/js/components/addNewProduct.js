const addNewProduct = () => {
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
        <input type="text" name="availability">
      </fieldset>
      <fieldset>
        <label for="category">Category: </label><br>
        <input type="text" name="category">
      </fieldset>
      <input type="submit" class="button">
      `;

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())

        axios.post(`/api/products/add`, data).then((res) => {
          console.log(res.status(200))
          console.log("Product Added")
          page.innerHTML = `<p>Product Added</p>`
        }).catch(err => {
          console.log("You need to be logged in")
        })
        renderHome()
    })
    page.replaceChildren(form);
};