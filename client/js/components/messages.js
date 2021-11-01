

function renderMessages() {
    console.log("rendering messages");
    const conversationId = 1;
    const page = document.getElementById("page");
    const messageBody = document.createElement("div");
    messageBody.classList.add("row");

  
    
    
    axios.get(`/api/messages/conversation/${conversationId}`)
        .then((res) => {
            console.log(res.data);
            const messages = res.data;
            messages.forEach(message => {
                const messageDiv = document.createElement("div");
                messageDiv.innerHTML = `
                <p class="text-muted text-end">${message.date}</>
                <p class="message">${message.content}</p>
                <p class="sent-by"> ${message.username}</p>
                `
                messageBody.appendChild(messageDiv);
            });

        }) 
        
        page.appendChild(messageBody);
        
           
}






function postMessages(){
    const page = document.getElementById("page");

    const messageFormRow = document.createElement("div");
    messageFormRow.classList.add("row");

    messageFormRow.innerHTML = `
    <div class="col">
        <form class="post-message d-flex flex-column">
            <textarea class="rounded"> </textarea>
            <button class=" btn btn-primary rounded-pill"><i class="fa fa-search"></i> </button>
        </form>
    </div>
    
    `
    page.appendChild(messageFormRow);

}