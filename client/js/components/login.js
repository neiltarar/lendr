
const renderLogin = () => {
    const page = document.getElementById("page");
    const loginForm = document.createElement("form");
    const loginMessage = document.createElement("div");

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
    
    loginMessage.innerHTML = `
        <h3 style="color: green"> Successfully Logged In </h3>
    `;

    loginForm.addEventListener("submit" , (event) => {
        // preventDefault function prevents refreshing the page
        event.preventDefault();
        // capturing input data in the form
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        // making post request to see if the user exists in the db
        axios.post('/api/sessionAuth' , data)
            .then((res) => {
                page.replaceChildren(loginMessage);
                setTimeout(function() {
                    page.innerHTML = "";
                    renderLoggednavBar();
                    home();
                }, 1000);
            })
            .catch((err) => {
                alert("wrong username or password");
        });
    });
    page.replaceChildren(loginForm);
};

function renderLogout() {
    axios.delete("/api/sessions").then((res) => {
      page.innerHTML = `<p style="color: red">You are logged out!</p>`;
      setTimeout(function () {
        page.innerHTML = "";
        renderNavBar();
        renderHome();
      }, 1000);
    });
  }

