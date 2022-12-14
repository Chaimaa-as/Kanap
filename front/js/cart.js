const productsInCart=kanapsSavedInLocalStorage(); 
const cartContainer=document.getElementById("cart__items");
const totalQtyLabel = document.getElementById("totalQuantity");
let nbproducts = 0;
let totalprice = 0;
const totalPriceLabel = document.getElementById("totalPrice");

    for(let [id, colors] of Object.entries(productsInCart)){
        console.log(id, colors)
        fetch("http://localhost:3000/api/products/" +id)
            .then(function(response){
                response.json()
                .then(function(product){

                    for(let [color, quantity] of Object.entries(colors)){

                        nbproducts += parseInt(quantity);
                        totalQtyLabel.innerHTML = nbproducts;

                        console.log(nbproducts)
                        totalprice+=product.price * parseInt(quantity);
                        totalPriceLabel.innerHTML = totalprice;

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
                    
                    const quantityBtns = document.getElementsByClassName("itemQuantity");
                    Object.values(quantityBtns).forEach(quantityBtn => { 
                        quantityBtn.addEventListener("change", function(event){
                            // Récupérer les informations via les attributs de l'article le plus proche pour les envoyer dans la fonction de modification.
                            let article = quantityBtn.closest("article");
                            console.log(article)
                            let productId = article.getAttribute("data-id");
                            console.log(productId)
                            let productColor = article.getAttribute("data-color");
                            let productQuantity=quantityBtn.value;
                            
                            modifyQuantityInLocalStorage (productId, productColor,parseInt(productQuantity));
                            location.reload();
                        })
                    })

                    const removeBtns = document.getElementsByClassName("deleteItem");
                    Object.values(removeBtns).forEach(removeBtn => { //foreach permet de récupérer l'index
                        removeBtn.addEventListener("click", function(){ 
                            // Récupérer les informations via les attributs de l'article le plus proche // pour les envoyer dans la fonction de suppression.
                            let article = removeBtn.closest("article");
                            console.log(article)
                            let productId = article.getAttribute("data-id");
                            console.log(productId)
                            let productColor = article.getAttribute("data-color"); 
                            console.log(productColor)

                            if(confirm("Voulez vous supprimer?")){
                                removeProductFromLocalStorage(productId, productColor);
                                location.reload()
                            }
                        })
                
                

                    })
                })
                .catch(function(errorJson){console.log(errorJson)})
            })
            .catch(function(error){console.log(error)})
    }

const orderForm = document.getElementsByClassName("cart__order__form")[0];
const allInputs = orderForm.elements;

document.querySelector("#order").addEventListener("click", (event) => {
    event.preventDefault();

    let valid = 0;

    for(let input of allInputs){
        let RegexForInput;// permettra de définir les types de regex
        if (input.type === "submit"){
            break;
        }
        if (input.type === "text"){
            RegexForInput = /^[a-zA-Z0-9\s,'-]*$/;
        }
        if (input.type === "email"){
            RegexForInput = /^[\w.-]+@[\w-]+\.\w{3,6}/;
        }
        if(input.value === ""){
            input.style.border = "1px solid red";
            input.nextElementSibling.innerHTML = "ce champs doit être complété";

        } else if(input.value.length<3){
            input.style.border = "1px solid red";
            input.nextElementSibling.innerHTML = "ce champs doit comporter min 3 caractères";
        } else if(input.value.match(RegexForInput) === null){
            input.style.border = "1px solid red";
            input.nextElementSibling.innerHTML = "champs invalide";
        } else {
            input.style.border = "1px solid green";
            input.nextElementSibling.innerHTML = "";
            valid++
        }
    }

    if(valid===5){
    // créer objet contact + product avant envoi.
    const contact = { // objet contact en mettant les informations de chaque champ du formulaire.
        firstName : allInputs[0].value,
        lastName : allInputs[1].value,
        address : allInputs[2].value,
        city :allInputs[3].value,
        email : allInputs[4].value
    }
    console.log(contact)
    
    const products = []; // tableau "products" qui va contenir les id des produits du panier pour ensuite les envoyer.
    
    const productsInCart=kanapsSavedInLocalStorage();
    
    for(let [id, colors] of Object.entries(productsInCart)){ // boucler sur les prod du panier.
            products.push(id) // pousser dans array product.
        }

    console.log(products)

    fetch('http://localhost:3000/api/products/order',{ // fetch pour l'envoi tableau.
        method : "POST", 
        headers : {"Content-type":"application/json;charset=UTF-8"}, // définit les entêtes pour préciser l'envoi de json.
        body : JSON.stringify({contact, products})// corps de la requete (l'objet contact et le tableau products dans le body).
    })
    .then (function(response){
            response.json()
            .then(function(orderInfo){
                // rediriger vers page confirmation avec parametre dans l'URL (avec location.replace en ajoutant l'ID de la cde dedans).
                window.location = "./confirmation.html?orderId=" + orderInfo.orderId; 
            })
            .catch (function(errorJson){console.log(errorJson)})
    })
    .catch(function(error){console.log(error)})
    }
})