const renderSignUp = () => {
    const page = document.getElementById("page");
    const signupForm = document.createElement("form");
    const signupMessage = document.createElement("h3");
    page.append(signupMessage)

    signupForm.innerHTML = `
        <fieldset>
            <label for="username">username:</label><br>
            <input type="text" name="username">
        </fieldset>
        <fieldset>
            <label for="email" placeholder="me@example.com">email:</label><br>
            <input type="text" name="email">
        </fieldset>
        <fieldset>
            <label for="password">password:</label><br>
            <input type="password" name="password">
        </fieldset>
        <fieldset>
            <label for="confirm_password">confirm password:</label><br>
            <input type="password" name="confirm_password">
        </fieldset>
        <input type="submit" value="sign up"></input>
    `;

signupForm.addEventListener("submit" , (event) => {
    // preventDefault function prevents refreshing the page
    event.preventDefault();
    // capturing input data in the form
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());

    // making post request to see if the user exists in the db
    axios.post('/api/users/signup', data) //redirects to this signup
        .then((res) => {
            console.log(res)
            console.log(res.status, "user successfully signed up")
            signupMessage.innerHTML = `
            <h3 style="color: green"> ${res.data.message} </h3>
        `;
            setTimeout(function() {
                page.innerHTML = "";
                renderNavBar();
                renderHome();
            }, 1000);
        })
        .catch((err) => {
            signupMessage.innerHTML = `
            <h3 style="color: red"> Please try again </h3>
        `;
            setTimeout(function() {
                page.innerHTML = "";
                renderSignUp();
                renderNavBar();
            }, 1000);
    });
});
page.replaceChildren(signupForm);
};

