// const { default: axios } = require("axios");

//Get Current user 
let user_id = undefined;
    //Get the current user id ;
    axios.get(`/api/sessions`).then((res) => {
        const sessions = res.data;
        if(sessions) {
            sessions.forEach(session => {
                console.log(session.sess.userId);
                user_id = session.sess.userId;
            });
        }

    })



function renderHome() {
    const page = document.getElementById('page');
    //Search Form 
    page.classList.add("container");
    
    //Form div
    const formRow = document.createElement('div');
    
    formRow.classList.add('hero');

    formRow.innerHTML = `
    <div class="container"> 
        <div class="row">
            <div class="col-md-4 hero-col"> 
                <h1>Lorem ipsum </h1>
                <p>Lorem ipsum lorem ipsum lorem lorem </p>
                <form class="home-search mt-5">
                    <input type="text" class="rounded" placeholder="Enter name" />
                    <button class="btn btn-primary rounded-pill"><i class="fa fa-search"></i></button>
                    
                </form>
            
            </div>
             <div class="col-md-8 d-flex justify-content-center  hero-col"> 
            
            </div>
        </div>
    </div>
    
    
    `
    //Products div
    const productsRow = document.createElement('div');
    productsRow.classList.add('row');
    productsRow.classList.add('products-row');

    const productsContainer = document.createElement('div');
    productsContainer.classList.add('d-flex');
    productsContainer.classList.add('flex-wrap');
    productsRow.append(productsContainer);
    //Single Product
    productsContainer.innerHTML = `
    <div class="product-single relative rounded"> 
        <a>
            <img width=388 height=250  src="./src/001.jpg" class="rounded-top" alt="Product Title"/>
            <div class="px-3 py-3">
            <p class="cat-tag">Category</p>
            <h4 class="pt-1 pb-1">Product Title</h4>
            <p class="pb-3"><span class="bold ">Available:</span> <span>1/11/2021 </span> </p>
            <button type="button" class="link" id="openConversation" data-toggle="modal" data-target="#exampleModal" onClick="renderMessages()" value="1">
                Contact Owner Name
            </button>
            <p class="price-tag text-end border-top pt-3"><span class="bold"> $35</span><span>/hour</span> </p>
            </div>
        </a>
    </div>
    
    `
    page.append(formRow);
    page.append(productsRow);

}

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
