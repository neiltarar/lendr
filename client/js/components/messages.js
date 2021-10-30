function renderMessages(){
    
    //Get the product owner id 
     const productrowner_id  = document.getElementById('openConversation').value;
     console.log(productrowner_id);
 
     console.log(user_id);
     
     if(productrowner_id !== undefined) {
         axios.get(`/api/conversations`)
         .then((res)=>{
             const conversations = res.data;
             
             console.log(conversations);
             // const conversationDiv = document.createElement('div');
             // conversationDiv.innerHTML = `
             //     <div class="">
             //         <h4> ${conversation.subject}</h4>
             //         <p>${conversation.date}</p>
             //         <p>Message</p>
             //         <p>Message</p>
             //         <form id="postMessageForm">
             //         <textarea id="w3review" name="w3review" rows="4" cols="50">
             //         </textarea>
             //         <input type="submit" value="Post Message"/>
             //         </form>
             //     </div>
             // `
             // page.appendChild(conversationDiv);
            
         })
         .catch(function (error) {
             console.log(error);
         })
 
     }
 
     
     
 
 }
 
 const postMessageForm = document.getElementById('postMessageForm');
 
 if(postMessageForm){
     postMessageForm.addEventListener("submit", (event)=> {
         event.preventDefault();
         const formData = new FormData(signupForm);
         const data = Object.fromEntries(formData.entries());
         console.log(data);
 
     })
 }