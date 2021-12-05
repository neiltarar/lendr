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
      const user_id = res.data["user_id"];
      const receiver = res.data["products"]["user_id"];
      const productName = res.data["products"]["name"];
      const productId = res.data["products"]["id"];
      form.innerHTML = `
      <form class="was-validated">
        <div class="mb-3">
          <label type="hidden" id="user_id" >${user_id}</label>
          <label for="validationTextarea" class="form-label">Subject: ${productName} - ID:${productId} </label>
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
        axios
          .post("/api/messages/", {
            productowner_id: receiver,
            sessionuser_id: document.getElementById("user_id").innerText,
            productid: productId,
            message: data["message"],
          })
          .then((res) => {
            console.log("response: " + res.data["status"]);
          });
      });
    })
    .catch((res) => {
      form.innerHTML = "<div> You need to login to send messages </div>";
    });
}
