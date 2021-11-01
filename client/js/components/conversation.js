
function renderConversation(productId) {
    const page = document.getElementById('page');
    page.innerHTML = '';
    const smallContainer = document.createElement("div");
    smallContainer.classList.add("row");
    smallContainer.classList.add("justify-content-center");
    smallContainer.classList.add("my-5");
   
    
    axios.get(`/api/conversations/product/${productId}`)
        .then((res) => {
            const conversation = res.data[0];
            if(conversation){
                console.log("conversation",conversation);
                const conversationDiv = document.createElement('div');
                conversationDiv.classList.add('col-8');
                conversationDiv.innerHTML = `
                     <div id="message-head" class="col d-flex justify-content-between py-4 border-bottom">
                        <h4>${conversation.subject} </h4>
                        <div> 
                            <p>${conversation.productname}</p>
                            <p class="text-muted">Message with: ${conversation.productowner}<p>
                        </div>
                       
                     </div>
                 `
                smallContainer.appendChild(conversationDiv);
                page.append(smallContainer);

            }else {
                smallContainer.textContent = "no convo"
            }
            // 
            renderMessages();
            postMessages();
            

        })
        .catch(function (error) {
            console.log(error);
        })


        



}

function createConversation(){

    
    const formData = new FormData(conversationForm);
        console.log(formData);

        const data = Object.fromEntries(formData.entries());
        console.log(data);

        axios.post('/' , data) //endpoint
            .then((res) => {
                page.innerHTML = '';
            })
            .catch((err) => {
                alert("couldnt post anything");
            });
}


