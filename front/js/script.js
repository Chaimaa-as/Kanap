const prodList = document.getElementById('items');

fetch("http://localhost:3000/api/products")
    .then(function(response){
        response.json()
        .then(function(products){
            console.log(products)
            for (let product of products){
                prodList.innerHTML += `
                <a href="./product.html?id=${product._id}">
                    <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                    </article>
                </a>`
            }
        })
    .catch(function(errorJson){console.log(errorJson)})
    })
    .catch(function(error){console.log(error)})