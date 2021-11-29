function renderMyMessages() {
  const page = document.getElementById("page");
  page.innerHTML = "";

  const messageFormRow = document.createElement("div");
  messageFormRow.classList.add("row");
  messageFormRow.classList.add("justify-content-center");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("col-8");
  const messageBody = document.createElement("div");
  messageBody.classList.add("row");
  messageBody.classList.add("justify-content-center");

  axios.get("/api/messages").then((res) => {
    const content = res.data["message"][0]["row"].split(",");
    const subject = content[0].replace(/[(]+/g, "");
    const date = content[1].split(" ")[0].replace(/["]+/g, "");
    const message = content[2].replace(/[""]+/g, "");
    const sentBy = res.data["userName"];
    messageDiv.innerHTML = `
                <p class="text-muted text-end">Subject:${subject}</>
                <p class="message"> <span id="message-date">${date}</span> - <span id="message-content">${message}</span></p>
                <p class="sent-by"> ${sentBy}</p>
                `;
    messageFormRow.innerHTML = `
        
        <div class="col-8">
            <form class="post-message d-flex flex-column">
                <textarea class="rounded"> </textarea>
                <button class=" btn btn-primary rounded-pill"><i class="fa fa-paper-plane"></i> </button>
            </form>
        </div>`;
  });

  messageBody.appendChild(messageDiv);
  page.appendChild(messageBody);
  page.appendChild(messageFormRow);
}
