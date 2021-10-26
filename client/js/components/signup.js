const renderSignUp = () => {
    const page = document.getElementById("page");
    const loginForm = document.createElement("form");
    const loginMessage = document.createElement("div");

    loginForm.innerHTML = `
        <fieldset>
            <label for="username">username:</label><br>
            <input type="text" name="username">
        </fieldset>
        <fieldset>
            <label for="email">email:</label><br>
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
    //do we need a comments section for users?

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
    axios.post('/api/signup' , data)
        .then((res) => {
            console.log(res.status(200), "user successfully signed up")
            page.innerHTML='';
            navBar();
            renderHome();
        })
        .catch((err) => {
            alert(`${err.response.data.error}`);
            console.log(err.response.data)
    });
});
page.replaceChildren(loginForm);
};

