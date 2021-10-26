function renderNavBar() {
    const header = document.getElementById('header-nav');
    header.innerHTML=`
    <nav class="navbar navbar-expand-lg navbar-transparent">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a onClick="renderLogin()" class="nav-link" href="#">Log in</a>
          <a onClick="renderSignUp()" class="nav-link" href="#">Sign up</a>
          <a class="nav-link disabled">Product</a>
        </div>
      </div>
    </div>
  </nav>
    
    `;
};

function renderLoggednavBar() {
  const header = document.getElementById('header-nav');
    header.innerHTML=`
    <nav class="navbar navbar-expand-lg navbar-transparent">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a onClick="renderLogout()" class="nav-link" href="#">Log Out</a>
          <a onClick="renderSignUp()" class="nav-link" href="#">Sign up</a>
          <a class="nav-link disabled">Product</a>
        </div>
      </div>
    </div>
  </nav>
    
    `;
};
