function uploadimage(){
    const page = document.getElementById("page");
    page.innerHTML = ''

    const form = document.createElement("form");
    form.className = 'Form'
    form.innerHTML = `
    <div class="mb-3">
        <label for="image" class="form-label">Small file input example</label>
        <input class="form-control form-control-sm" id="image" type="file" name="image">
        </div>
        <div>
        <input type="submit" class="btn btn-blue w-100">
        
        `;
    
    form.addEventListener("submit", async (event) => {
        //upload image to cloudinary 
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data.image);
        let image = data.image;
        
        // function getBase64(image) {
        //     var reader = new FileReader();
        //     reader.readAsDataURL(image);
        //     reader.onload = function () {
        //       console.log(reader.result);
        //     };
        //     reader.onerror = function (error) {
        //       console.log('Error: ', error);
        //     };
        // }
        // image = getBase64(image);
        axios.post(`/api/images`, data).then((res) => { 
            
            console.log(getBase64(image))

        });
         

        
        });
    page.appendChild(form);
}