function renderMyMessages() {
  const page = document.getElementById("page");
  page.innerHTML = "";
  const form = document.createElement("form");

  form.classList.add("row");
  form.classList.add("justify-content-center");

  axios.get("/api/messages").then((res) => {
    res.data["message"].forEach((data) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("col-8");
      const messageBody = document.createElement("div");
      messageBody.classList.add("row");
      messageBody.classList.add("justify-content-center");

      const content = data["row"].split(",");
      const author = res.data["userID"];
      const subject = content[2];
      const date = content[1].split(" ")[0].replace(/['"']+/g, "");
      const message = content[0].replace(/['("']+/g, "");
      const currentUserName = res.data["userName"];
      const sentById = content[3];
      const conversationId = content[4].replace(/[')']+/g, "");

      axios.get(`/api/messages/${sentById}`).then((response) => {
        const sentBy = response.data["sentBy"];
        messageDiv.innerHTML = `
                  <p class="text-muted text-end">Subject:${subject}</>
                  <p class="message"> <span id="message-date">${date}</span> - <span id="message-content">${message}</span></p>
                  <p class="sent-by"> ${sentBy}</p>
                  `;
        form.innerHTML = `
          <div class="col-8">
            <form class="was-validated">
              <div class="mb-3">
                <label for="validationTextarea" class="form-label">Hi ${currentUserName}</label>
                <textarea name="message" class="form-control is-invalid" id="validationTextarea" placeholder="Required example textarea" required></textarea>
                <div class="invalid-feedback">
                  Please enter a message in the textarea.
                </div>
              </div>
            </form>
            <button class="justify-content-end btn btn-primary rounded-pill"><i class="fa fa-paper-plane"></i> </button>
          </div>`;
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          const messageBox = document.getElementById("validationTextarea");
          messageBox.value = "";
          console.log(data["message"]);
          axios
            .post("/api/messages/myMessages", {
              conversation_id: conversationId,
              author: author,
              message: data["message"],
            })
            .then((res) => {
              console.log("response: " + res);
            });
        });
      });
      messageBody.appendChild(messageDiv);
      page.appendChild(messageBody);
      page.appendChild(form);
    });
  });
}
