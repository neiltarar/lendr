const renderLogin = () => {
    const page = document.getElementById("page");
    const loginForm = document.createElement("form");
    const loginMessage = document.createElement("h3");
    page.append(loginMessage)

    loginForm.innerHTML = `
        <fieldset>
            <label for="email">email:</label><br>
            <input type="text" name="email">
        </fieldset>
        <fieldset>
            <label for="password">password:</label><br>
            <input type="password" name="password">
        </fieldset>
        
        <input type="submit" value="login"></input>
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
                <h3 style="color: green"> ${req.data.message} </h3>
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
                <h3 style="color: red"> Invalid email or password </h3>`
                page.replaceChildren(loginMessage);
                setTimeout(function() {
                    page.innerHTML = "";
                    renderNavBar();
                    renderLogin();
                }, 1000);
        });
    });
    page.replaceChildren(loginForm);
};

function renderLogout() {
    axios.delete("/api/sessions").then((req, res) => {
      page.innerHTML = `<p style="color: red">${req.data.message}</p>`;
      setTimeout(function () {
        page.innerHTML = "";
        renderNavBar();
        renderHome();
      }, 1000)
      .then((res) => {
          console.log(res.data);
      });
    });
  }

