function handleSubmit(event) {
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    axios.post("/", "product image").then((res) => {
      console.log("host new item response: ", res);
      renderHome();
    });
  });
}

exports.handleSubmit;
