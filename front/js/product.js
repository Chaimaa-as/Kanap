// VARIABLES GLOBALES------------------------------------------------------------------------------------------------

// Récupérer la chaine dans l'URL (=ce qui vient à partir du "?")
const pageUrlString = window.location.search;

// Autres variables globales-----------------------------------------------------------------------------------------
const btnAddProduct = document.getElementById("addToCart")
const imageContainer = document.getElementsByClassName("item__img")[0]
const selectColors = document.getElementById("colors")
const selectQuantity = document.getElementById("quantity")
const selectNames = document.getElementById("title");

// Extraire ID avec URLSearchParams
const urlParams = (new URL(location)).searchParams;
const idPage = urlParams.get("id");
console.log({idPage});

// FIN__VARIABLES GLOBALES --------------------------------------------------------------------------------------------


// RECUPERATION, FORMATAGE ET INJECTION----------------------------------------------------------------------------

    fetch(`http://localhost:3000/api/products/${idPage}`) 
    // variable globale déclarée précédemment (ligne 15)
    .then((response) => {
        response.json() // ma réponse (la liste des produits) en "response.json" (cad mon article au format JSON cad format renvoyé par le back-end)
        .then((product) => {
            console.log({product});
            const img = document.createElement("img"); // là je crée juste la balise img 
            img.src = product.imageUrl; // on set l url de l image dans la balise qu on vient de créer
            img.alt = product.altTxt; // on set l alt text de l image dans la balise qu on vient de créer
            imageContainer.appendChild(img); // on injecte la balise qu on a créé dans le container

            
            // là je récupère et affiche infos produit
            const prodTitle = document.getElementById("title"); 
            const prodPrice = document.getElementById("price");
            const prodText = document.getElementById("description");
            title.innerHTML = product.name;
            price.innerHTML = product.price;
            description.innerHTML = product.description;


            for (let color of product.colors) {
                console.log(color)
                const option = document.createElement("option")
                option.value = color
                option.innerHTML = color
                selectColors.appendChild(option)
            }
            
            // écouter EVT et récupérer sélection pour transférer au panier
            btnAddProduct.addEventListener("click", function(event){ 
                if(canAddToCart()){
                    addToCart(idPage, selectColors.value, selectQuantity.value)
                } 
                
                })
                // .catch((errorJson) => console.log(errorJson))   
            })

                .catch((errorApi) => console.log(errorApi))
            })