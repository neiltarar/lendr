function renderHome() {
    const page = document.getElementById('page');
    //Search Form 
    page.classList.add("container");
    
    const searchForm = document.createElement('form');
    const searchInput = document.createElement('input');
    searchInput.setAttribute("type", "text");
    const searchButton = document.createElement('input')
    searchButton.setAttribute("type", "submit");

    searchForm.append(searchInput);
    searchForm.append(searchButton);
    
    page.append(searchForm);

    //Products div
    const productsContainer = document.createElement('div');
    productsContainer.classList.add("col");

    //Single Product
    const productSingle = document.createElement('div');

    const productTitle = document.createElement('h4');
    productTitle.innerHTML = "Product Title"
    const productPrice = document.createElement('p');
    productPrice.innerHTML = "35";

    productSingle.append(productTitle);
    productSingle.append(productPrice);

    productsContainer.append(productSingle);

    page.append(productsContainer);

}