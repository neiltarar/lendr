const renderSignUp = () => {
    const page = document.getElementById("page");
    const signupForm = document.createElement("form");
    const signupMessage = document.createElement("h3");

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
        .then((response) => {
            console.log(response)
            page.innerHTML = `
                <h3 style="color: green"> Welcome to lendr! </h3>
                `
            console.log(signupMessage)
            setTimeout(function() {
                page.innerHTML = "";
                renderLogin();
                renderNavBar();
            }, 1000);
        })
        .catch((err) => {
            page.innerHTML = `
                <h3 style="color: red"> Could not add user </h3>`
            setTimeout(function() {
                page.innerHTML = "";
                renderSignUp();
                renderNavBar();
            }, 1000);
    });
});
page.replaceChildren(signupForm);
};

