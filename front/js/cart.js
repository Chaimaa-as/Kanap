fetch("http://localhost:3000/api/products")
    .then(function(response){
        response.json()
        .then(function(products){
            console.log(products);
            const cartContainer=document.getElementById("cart__items");
            const productsInCart=kanapsSavedInLocalStorage();
            //on parcourt le tableau de produits. Chaque case du tableau est mis au fur
            for (let product of products){
                //on recupere dans le tableau des prduits du panier celui qui a l id du produit qu on est en train de vouloir afficher
                const prodfromcart=productsInCart[product._id];
                if(prodfromcart){
                    cartContainer.innerHTML += `
                    <article class="cart__item" data-id="${product._id}" data-color="{product-color}">
                        <div class="cart__item__img">
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                        </div>

                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>Nom du produit</h2>
                                <p>Vert</p>
                                <p>42,00 €</p>
                            </div>

                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`
                }
            }
        })
    .catch(function(errorJson){console.log(errorJson)})
    })
    .catch(function(error){console.log(error)})