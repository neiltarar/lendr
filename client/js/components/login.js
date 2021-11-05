const renderLogin = () => {
    const page = document.getElementById("page");
    page.innerHTML = "";
    const formRow = document.createElement("div");
    formRow.classList.add("row");
    formRow.classList.add("mt-5");
    formRow.classList.add("pt-5");
    formRow.classList.add("justify-content-center");
    formRow.classList.add("align-items-center");
    const formCol= document.createElement("div");
    formCol.classList.add("col-4");

    const loginForm = document.createElement("form");
    loginForm.classList.add("w-100")
    const loginMessage = document.createElement("h3");
    page.append(loginMessage)

    loginForm.innerHTML = `
        <fieldset>
            <label for="email" class="form-label">Email:</label><br>
            <input class="w-100 form-control" type="text" name="email" placeholder="Type your email">
        </fieldset>
        <fieldset>
            <label for="password" class="form-label">Password: </label><br>
            <input class="w-100 form-control" type="password" name="password" Placeholder="Type your password">
        </fieldset>
        <input type="submit" value="Login" class="btn btn-blue w-100"></input>
    `;
    
    loginForm.addEventListener("submit" , (event) => {
        // preventDefault function prevents refreshing the page
        event.preventDefault();
        // capturing input data in the form
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        // making post request to see if the user exists in the db
        axios.post('/api/users/login' , data) //endpoint
            .then((req,res) => {
                loginMessage.innerHTML = `
                <div class="row justify-content-center mt-5 pt-5"> 
                    <div class="col-8"><h2> ${req.data.message} </h2> </div>
                </div>
                
            `;        
                page.replaceChildren(loginMessage);
                setTimeout(function() {
                    page.innerHTML = "";
                    renderLoggednavBar();
                    renderHome();
                }, 1000);
            })
            .catch((res) => {
                loginMessage.innerHTML = `
                <div class="row justify-content-center mt-5 pt-5"> 
                    <div class="col-8"<h2> Invalid email or password </h2></div>
                </div>`
                page.replaceChildren(loginMessage);
                setTimeout(function() {
                    page.innerHTML = "";
                    renderNavBar();
                    renderLogin();
                }, 1000);
        });
    });
    
    
    // page.replaceChildren(loginForm);
    formCol.appendChild(loginForm);
    formRow.appendChild(formCol);
    page.appendChild(formRow);
};

function renderLogout() {
    axios.delete("/api/sessions").then((req, res) => {
      page.innerHTML = `
      <div class="row justify-content-center mt-5 pt-5"> 
        <div class="col-8"<h2>${req.data.message} </h2></div>
      </div>
      
      
      `;
      setTimeout(function () {
        page.innerHTML = "";
        renderLoggednavBar();
        renderHome();
      }, 1000)
    })
    .catch((res) => {
        page.innerHTML = `
        <h3 style="color: red"> Could not logout </h3>`
        setTimeout(function() {
            page.innerHTML = "";
            renderLoggednavBar();
            renderHome();
        }, 1000);
  });
}

