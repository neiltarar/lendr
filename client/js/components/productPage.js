const productPage = (id) => {
    page.innerHTML = '';

    axios.get(`/api/products/${id}`).then((response) => {
        console.log(response)
    })

    const deleteProduct = document.createElement('button') //delete product
    page.append(deleteProduct) //may need to append to different html element

    deleteProduct.addEventListener("click", (event) => {
        id = req.params.id
        console.log(id)

        axios.delete(`/api/products/${id}`).then((response) => {
            console.log(res.status(200), 'deleted')
        }).catch(err => {
            console.log(err.response.data)
            error.innerHTML = `<p>"You do not have the rights to delete a product"</p>`
        })
        renderproductPage();
    })
}