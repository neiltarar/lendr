
function renderConversation() {
    const page = document.getElementById('page');
    page.classList.add("messages");
    page.classList.add("small-container");
    page.innerHTML = "";
    //Get the product owner id 

    productId = 1;


    axios.get(`/api/conversations/product/${productId}`)
        .then((res) => {
            const conversation = res.data.rows[0];
            console.log(conversation);
            //  console.log(conversations);
            const conversationDiv = document.createElement('div');
            conversationDiv.classList.add('row');
            conversationDiv.innerHTML = `
                 <div id="message-head" class="col d-flex justify-content-between py-4 border-bottom">
                    <h4>${conversation.subject} </h4>
                    <div> 
                        <p>${conversation.productname}</p>
                        <p class="text-muted">Message with: ${conversation.productowner}<p>
                    </div>
                   
                 </div>
             `
            page.appendChild(conversationDiv);
            renderMessages();
            postMessages();
            

        })
        .catch(function (error) {
            console.log(error);
        })


        page.classList.remove("small-container");



}


