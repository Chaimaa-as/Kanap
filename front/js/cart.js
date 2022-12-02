
function drawCart(){

const productsInCart=kanapsSavedInLocalStorage(); 
// variable avec tous les produits qui viennent du localstorage

const cartContainer=document.getElementById("cart__items");
cartContainer.innerHTML=""

    for(let [id, colors] of Object.entries(productsInCart)){
        console.log(id, colors)
        fetch("http://localhost:3000/api/products/" +id)
            .then(function(response){
                response.json()
                .then(function(product){
                    let nbproducts=0;
                    let totalprice=0;
                    for(let [color, quantity] of Object.entries(colors)){

                        nbproducts++;
                        totalprice+=product.price*quantity;

                        cartContainer.innerHTML += `
                            <article class="cart__item" data-id="${product._id}" data-color="${color}">
                                <div class="cart__item__img">
                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${product.name}</h2>
                                        <p>${color}</p>
                                        <p>${product.price} €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                            <p>Qté :</p>
                                            <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${quantity}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </article>`
                    }
                
                    

                     const quantityBtns = document.getElementsByClassName("itemQuantity")
                     Object.values(quantityBtns).forEach(quantityBtn => { 
                        quantityBtn.addEventListener("change", function(event){
                            let article = quantityBtn.closest("article") 
                            console.log(article)
                            let productId = article.getAttribute("data-id")
                            console.log(productId)
                            let productColor = article.getAttribute("data-color") 
                            let productQuantity=quantityBtn.value
                            
                            modifyQuantityInLocalStorage (productId, productColor,parseInt(productQuantity))
                        }
                    )}
                     )

                    /* modif  : condition qté avant fonction
                    Condition quantité :
                            SI on clique et que le résultat est inférieur à la quantité stockée
                                alors on décremente de 1
                                    SI il reste 0 (-1) 
                                        -> kanap supprimé 
                                    SI résultat supérieur à la quantité stockée et inférieur à 100
                                        alors on incrémente de 1
    
                            SI (cette condition est remplie()){
                                mettre à jour la quantité dans localStorage

                        modifyQuantityInLocalStorage (productId, productColor)

                        */
                    // })
                    

                    const removeBtns = document.getElementsByClassName("deleteItem")
                    Object.values(removeBtns).forEach(removeBtn => { //foreach te permet de récupérer l'index
                        removeBtn.addEventListener("click", function(){ 
                            // Récupérer les informations via les attributs de l'article le plus proche // pour les envoyer dans la fonction de suppression.
                            let article = removeBtn.closest("article") 
                            console.log(article)
                            let productId = article.getAttribute("data-id")
                            console.log(productId)
                            let productColor = article.getAttribute("data-color") 
                            console.log(productColor)

                            if(confirm("Voulez vous supprimer?")){
                                removeProductFromLocalStorage(productId, productColor) 
                                drawCart()
                            }
                            /*condition pour pouvoir commander
                            
                        




                            Et après fonction
                            

                            */

                            /* 
                            sélectionner les éléments où le btb supprimer a été cliqué
                                produits renregoistrés dans local storage = produits renregoistrés dans local storage.filter( element => element.id du produit sélectionné !== id_sélecetionner_suppression );
                                console.log(produits renregoistrés dans local storage)
                                
                                pour le moment il ne se passe rien tant qu'on ne l'a pas envoyé dans le local storage
                                    localstorage.setritem = stringify...

                            sélection id du produit qui va etre supprimé en cliquant sur le bouton
                                let id_sélecetionner_suppression = produits enregistrés dans local storage.id_sélecetionner_suppression
                                console.log(id_sélecetionner_suppression) -> permet de voir sur l'inspecteur chaque élément supprimer
                        */

                        // removeProductFromLocalStorage(productId, productColor)                       
                            /*
                            si (cette condition définie par la fonction suppression dans manage ls est remplie()){
                                delete "objet.propriété "[id][color]
                            })
                            */
                        })
                        const totalQteLabel=document.getElementById("totalQuantity")
                        totalQteLabel.innerText=nbproducts
                    
                        const totalPriceLabel=document.getElementById("totalPrice")
                        totalPriceLabel.innerText=totalprice
                    })
                })
                .catch(function(errorJson){console.log(errorJson)})
            })
            .catch(function(error){console.log(error)})
    }

    

}
drawCart();

    const orderForm = document.getElementsByClassName("cart__order__form")[0];
    const allInputs = orderForm.elements;

        document.querySelector("#order").addEventListener("click", (event) => {
            event.preventDefault();

            let valid = 0;

            for(let input of allInputs){
                let RegexForInput;// 1ere definir type de regex
                if (input.type==="submit"){
                    break;
                }
                if (input.type==="text"){
                    RegexForInput = /^[a-zA-Z-\s]*$/;
                }
                if (input.type==="email"){
                    RegexForInput = /^[\w.-]+@[\w-]+\.\w{3,6}/;
                }
                if(input.value === ""){
                    input.style.border = "1px solid red";
                    input.nextElementSibling.innerHTML = "ce champs doit être complété"

                } else if(input.value.length<3){
                    input.style.border = "1px solid red";
                    input.nextElementSibling.innerHTML = "ce champs doit comporter min 3 caractères"
                } else if(input.value.match(RegexForInput) === null){
                    input.style.border = "1px solid red";
                    input.nextElementSibling.innerHTML = "champs invalide"
                } else {
                    input.style.border = "1px solid green";
                    input.nextElementSibling.innerHTML = "";
                    valid++;
                }
            }

            if(valid===5){
                //on envoie le formulaire (en requête)
                // Il faut préparer l'objet contact en mettant les informations de chaque champ du formulaire 
                //et les tableau "products" contenant les identifiants des produits du panier pour ensuite les envoyer.
                
                // créer objet contact + product avant envoi (apres 257 )
                

                const contact = {
                    firstName : allInputs[0].value,
                    lastName : allInputs[1].value,
                    address : allInputs[2].value,
                    city :allInputs[3].value,
                    email : allInputs[4].value,
                } // verif index
                console.log(contact)
                const products = []
                
                const productsInCart=kanapsSavedInLocalStorage()
                // après ça faut boucler sur les prod du panier -> recup id + pousser dans array product COMMENT LE TRANSFORMER EN TABLEAU
                
                for(let [id, colors] of Object.entries(productsInCart)){
                    for(let [color, quantity] of Object.entries(colors)){
                        let product={
                            id:id,
                            color:color,
                            quantity:quantity
                        }
                        products.push(product)
                    }
                }

                

                console.log(products)

                fetch('http://localhost:3000/api/products/order',{ // mettre en place le fetch pour l'envoi tableau
                    method :"POST", // 1 : méthode sur post
                    headers : {"Content-type":"application/json;charset=UTF-8"}, //2 : définir les entêtes pour préciser l'envoi de json.
                    body : JSON.stringify({contact, products})//là on met le corps de la requete
                    //mettre l'objet contact et le tableau products dans le body
                })
                .then (function(response){
                        response.json().then(function(orderInfo){
                        window.location="./confirmation.html?orderId="+orderInfo.orderId
                    })
                })
                .catch (function(errorJson){console.log(errorJson)})
                // là je gère le .then -> rediriger vers page confirmation avec parametre dans l'URL (avec location.replace en ajoutant l'ID de la cde dedans
                // + .catch
                // gérer confirmation
            }
    })


