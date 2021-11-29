const renderSignUp = () => {
  const page = document.getElementById("page");
  page.innerHTML = "";
  const formRow = document.createElement("div");
  formRow.classList.add("row");
  formRow.classList.add("mt-5");
  formRow.classList.add("pt-5");
  formRow.classList.add("justify-content-center");
  formRow.classList.add("align-items-center");
  const formCol = document.createElement("div");
  formCol.classList.add("col-4");
  const signupForm = document.createElement("form");
  const signupMessage = document.createElement("h3");

  signupForm.innerHTML = `
        <fieldset>
            <label class="form-label" for="username">Username:</label><br>
            <input class="w-100 form-control" type="text" name="username" placeholder="Type your username or email">
        </fieldset>
        <fieldset>
            <label class="form-label" for="email" >Email:</label><br>
            <input class="w-100 form-control" type="text" name="email" placeholder="me@example.com">
        </fieldset>
        <fieldset>
            <label class="form-label" for="password">Password:</label><br>
            <input class="w-100 form-control" type="password" name="password" placeholder="Type your password">
        </fieldset>
        <fieldset>
            <label class="form-label" for="confirm_password">Confirm password:</label><br>
            <input class="w-100 form-control" type="password" name="confirm_password" placeholder="Confirm your password">
        </fieldset>
        <input type="submit" value="Sign up" class="btn btn-blue w-100"></input>
    `;

  signupForm.addEventListener("submit", (event) => {
    // preventDefault function prevents refreshing the page
    event.preventDefault();
    // capturing input data in the form
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());

    // making post request to see if the user exists in the db
    axios
      .post("/api/users/signup", data) //redirects to this signup
      .then((response) => {
        console.log(response);
        page.innerHTML = `
                <h3 style="color: green"> Welcome to lendr! </h3>
                `;
        console.log(signupMessage);
        setTimeout(function () {
          page.innerHTML = "";
          renderLogin();
          renderNavBar();
        }, 1000);
      })
      .catch((err) => {
        page.innerHTML = `
                <h3 style="color: red"> Could not add user </h3>`;
        setTimeout(function () {
          page.innerHTML = "";
          renderSignUp();
          renderNavBar();
        }, 1000);
      });
  });
  // page.replaceChildren(signupForm);
  formCol.appendChild(signupForm);
  formRow.appendChild(formCol);
  page.appendChild(formRow);
};
