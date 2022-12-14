// affichage de l'ensemble des produits

// récupérer l'id des éléments à injecter
const prodList = document.getElementById('items');


// requêter l’API pour lui demander l’ensemble des produits.
fetch("http://localhost:3000/api/products")
.then(function(response){
    response.json()
    // récupérer la réponse émise et parcourir celle-ci pour insérer chaque élément (chaque produit) dans la page d’accueil (dans le DOM). 
    .then(function(products){
        console.log(products)
            
        // parcourir le tableau de produits avec la boucle.
        for (let product of products){
                // afficher dynamiquement pour chaque produit : id, imageUrl, altTxt, name, description.
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