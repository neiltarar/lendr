function renderNavBar() {
    const header = document.getElementById('header-nav');
    header.innerHTML=`
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent pt-3 pb-3">
        <div class="container">
        <a class="navbar-brand" onClick="renderHome()">Logo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav justify-content-end w-100">
            <a class="nav-link" aria-current="page" onClick="renderHome()">Home</a>
            <a class="nav-link" onClick="renderLogin()">Log in</a>
            <a class="nav-link" onClick="renderSignUp()">Sign up</a>
            </div>
        </div>
        </div>
  </nav>
    
    `;
};

function renderLoggednavBar() {
  const header = document.getElementById('header-nav');
  header.innerHTML=`
  <nav class="navbar navbar-expand-lg navbar-light bg-transparent pt-3 pb-3">
      <div class="container">
      <a class="navbar-brand" onClick="renderHome()">Logo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav justify-content-end w-100">
          <a class="nav-link" aria-current="page" onClick="renderHome()">Home</a>
          <a onClick="renderLogout()" class="nav-link" href="#">Log Out</a>
          <a class="nav-link" onClick="renderSignUp()">Sign up</a>
          </div>
      </div>
      </div>
</nav>
  
  `;
};

