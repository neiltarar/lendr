function renderNavBar() {
    axios.get(`/api/sessions`)
    .then((res) => {
        renderLoggedInNavbar();
    })
    .catch(err => {
        renderNotLoggedInNavbar();
    });
}

function renderNotLoggedInNavbar() {
    const header = document.getElementById('header-nav');
    header.innerHTML=`
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
        <a class="navbar-brand" onClick="renderHome()"><img height="60" width="60" src="./src/images/Logov2.png"alt="logo"/></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav justify-content-end w-100">
            <a class="nav-link" aria-current="page" onClick="renderHome()">Home</a>
            <a class="nav-link" onClick="renderLogin()">Host an Item</a>
            <a class="nav-link" onClick="renderLogin()">Log in</a>
            <a class="nav-link" onClick="renderSignUp()">Sign up</a>
            </div>
        </div>
        </div>
    </nav>`;
};

function renderLoggedInNavbar() {
  const header = document.getElementById('header-nav');
  header.innerHTML=`
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
      <a class="navbar-brand" onClick="renderHome()"><img height="60" width="60" src="./src/images/Logov2.png"alt="logo"/></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav justify-content-end w-100">
          <a class="nav-link" aria-current="page" onClick="renderHome()">Home</a>
          <a onClick="renderNewProduct()" class="nav-link" href="#">Host an Item</a>
          <a onClick="renderLogout()" class="nav-link" href="#">Log Out</a>
          </div>
      </div>
      </div>
</nav>
  `;
};