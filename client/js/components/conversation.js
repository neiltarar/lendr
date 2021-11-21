function renderConversation(productId) {
  const page = document.getElementById("page");
  page.innerHTML = "";
  const formRow = document.createElement("div");
  formRow.classList.add("hero");
  const form = document.createElement("form");
  form.className = "Form, was-validated";
  const message = document.createElement("p");
  page.append(message);
  formRow.append(form);
  page.append(form);
  axios
    .get(`/api/conversations/product/${productId}`)
    .then((res) => {
      const receiver = res.data["products"]["user_id"];
      const productName = res.data["products"]["name"];
      const productId = res.data["products"]["id"];
      form.innerHTML = `
      <form class="was-validated">
        <div class="mb-3">
          <label for="validationTextarea" class="form-label">Sucbject: ${productName} - ID:${productId} </label>
          <textarea name="message" class="form-control is-invalid" id="validationTextarea" placeholder="Type your message..." required></textarea>
          <div class="invalid-feedback">
            You cannot leave the message area blank.
          </div>
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" type="submit" >Send</button>
        </div>
      </form>`;
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const messageBox = document.getElementById("validationTextarea");
        messageBox.value = "";
        console.log(data["message"]);
        axios
          .post("/api/messages/", {
            message: data["message"],
          })
          .then((res) => {
            console.log("response: " + res.data["status"]);
          });
      });

      // console.log(data["message"]);
    })
    .catch((res) => {
      form.innerHTML = "<div> You need to login to send messages </div>";
    });
}
