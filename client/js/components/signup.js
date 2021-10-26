
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
            <label for="repeat_password">repeat password:</label><br>
            <input type="password" name="repeat_password">
        </fieldset>
        <input type="submit" value="sign up"></input>
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
    axios.post('/api/login' , data)
        .then((res) => {
            page.innerHTML='';
            navBar();
            home();
        })
        .catch((err) => {
            alert("wrong username or password");
    });
});
page.replaceChildren(loginForm);
};

