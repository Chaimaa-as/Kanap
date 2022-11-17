async function UpdateCart() {
    const OneProduct = await CreateProductForCart();
    const AllProducts = localStorage.getItem('Allproducts');
    const Cart =  AllProducts ? JSON.parse(AllProducts) : [];
    //Cart est le panier de l'utilisateur, un tableau des produits déjà choisis par celui-ci
    //OneProduct.id est le nouveau produit choisi par l'utilisateur avec son id
    //OneProduct.coloration est le nouveau produit par l'utilisateur avec sa couleur
 
    if (Cart.length === 0) {
        Cart.push(OneProduct);
        console.log('test length === 0');
        return Cart;
    } else {
       for (let CartParts of Cart) {
            if (CartParts.id == OneProduct.id && CartParts.coloration == OneProduct.coloration) {
                console.log('test condition if');
                let number_inCart = parseInt(CartParts.number);
                let number_inOneProduct = parseInt(OneProduct.number);
 
                number_inCart += number_inOneProduct;
                CartParts.number = number_inCart;
                return Cart;
 
            } else {
                console.log('test CartParts.id: ' + CartParts.id);
                console.log('test typeof CartParts.id: ' + typeof CartParts.id);
                console.log('test CartParts.coloration: ' + CartParts.coloration);
                console.log('test typeof CartParts.coloration: ' + typeof CartParts.coloration);
                console.log('test OneProduct.id: ' + OneProduct.id);
                console.log('test typeof OneProduct.id: ' + typeof OneProduct.id);
                console.log('test OneProduct.coloration: ' + OneProduct.coloration);
                console.log('test typeof OneProduct.coloration: ' + typeof OneProduct.coloration);
 
                Cart.push(OneProduct);
                return Cart;
            }
        }
    }
}

// Si la boucle n'a pas rencontré de produit correspondant, les instructions qui suivent la boucle seront exécutées. Donc c'est à ce moment-là que tu créé la nouvelle entrée dans le panier.
// Pour schématiser :


function ajouterArticle(articleId, qté) {
   for(item of panier){
      if(articleId == item.id){//si l'article ajouté correspond à un article du panier
         item.qté += qté; // modifier sa quantité
         return; //mettre fin à la fonction
      }
   }

//les instructions suivantes ne seront exécutées que si l'article n'est pas déjà présent dans le panier
   panier.push({id: articleId, qté: qté});//ajouter l'article et sa quantité dans le panier
// }

// Le code ci-dessus illustre la démarche, il n'est bien entendu pas fonctionnel.


// Vous pouvez utiliser le key method. localStorage.key(index) renvoie le index 
// (l'ordre est défini par l'implémentation mais est constant jusqu'à ce que vous ajoutiez ou supprimiez des clés).
// 
for (var i = 0; i < localStorage.length; i++){
    $('body').append(localStorage.getItem(localStorage.key(i)));
}


// Source: https://prograide.com/pregunta/56383/boucle-dans-localstorage-en-html5-et-javascript

/* <---------------------------------------------- constantes & variables  --------------------------------------------------------------------> */

const cartItems = document.getElementById("cart__items");
const cartItem = document.getElementsByClassName("cart__item");
const totalQuantity = document.getElementById("totalQuantity");
const itemQuantity = document.getElementsByClassName("itemQuantity");
const totalPrice = document.getElementById("totalPrice");
const deleteItem = document.getElementsByClassName("deleteItem");

/* <---------------------------------------------- fonctions --------------------------------------------------------------------> */

// recupère les données présentent sur l'api
const retrieveProductsPromise = () => {
  let storedIdUpdated = [];
  // on reset promises pour chaque utilisation de retrieveProductsPromise()
  let promises = [];

  for (let i = 0; i < storedItems.length; i++) {
    // doublons possiblent dans storedItems[i].id car differentes couleurs avec meme id possible
    // à chaque incrémentation nous verifions donc si l'id à été incrémenté précedemment, sinon on stock le nouvel id pour l'utiliser dans fetch en dessous
    if (!storedIdUpdated.includes(storedItems[i].id)) {
      storedIdUpdated.push(storedItems[i].id);
    }
  }
  // on crée un tableau de promesses qui retourne chaque informations par id
  for (const id of storedIdUpdated) {
    promises.push(
      // on utilise storedIdUpdated pour récuperer les id et cibler notre fetch >> on incremente dans l'array promises pour chaque id unique
      fetch("http://localhost:3000/api/products/" + id)
        .then((res) => res.json())
        .catch((err) =>
          console.log(
            "Une erreur s'est produite sur la fonction retrieveProductsData ",
            err
          )
        )
    );
  }
  // on retourne les promesses afin de les résoudre dans mainCart()
  return promises;
};
// permets de mettre à jour totaux et/ou DOM apres resolution des promesses
const mainCart = () => {
  const productsPromise = retrieveProductsPromise();
  // on résout les promesses retournées par retrieveProductsPromise() et les passe en arguments des fn
  Promise.all(productsPromise).then((products) => {
    // Cette condition permet de pouvoir lancer la fn sumTotals sans fillCart qui ne se jouera qu'une seule fois au chargement de la page en verifiant si un ou plusieurs child article sont présent sur le DOM
    if (!document.querySelector("#cart__items > article")) {
      // verifie si DOM enfant à cartItems existe
      fillCart(products);
    }
    sumTotals(products);
  });
};

// on verifie si le panier existe dans le localStorage, si oui alors on lance mainCart
if (localStorage.getItem("Panier")) {
  var storedItems = JSON.parse(localStorage.getItem("Panier"));
  mainCart(); // Mise en place DOM et totaux
}

// crée le DOM du panier en comparant les ids dans l'api et le local storage
const fillCart = (apiProducts) => {
  //on joue chaque produits récupérés
  apiProducts.map((apiProduct) => {
    //boucle for pour avoir accès à l'index de storedItems
    for (let i = 0; i < storedItems.length; i++) {
      // dès qu'un id de stocké match avec l'id de l'api on ajoute alors les infos présentent dans l'api au DOM
      if (apiProduct._id === storedItems[i].id) {
        /* -------------------------- creations des éléments ------------------------------------- */
        let article = document.createElement("article");
        let divImg = document.createElement("div");
        let img = document.createElement("img");
        let divContent = document.createElement("div");
        let divContentDescription = document.createElement("div");
        let h2 = document.createElement("h2");
        let pColor = document.createElement("p");
        let pPrice = document.createElement("p");
        let divContentSettings = document.createElement("div");
        let divContentSettingsQuantity = document.createElement("div");
        let pQuantité = document.createElement("p");
        let pInput = document.createElement("input");
        let divContentSettingsDelete = document.createElement("div");
        let pDelete = document.createElement("p");

        /* -------------------------- creations des attributs des éléments ------------------------------------- */

        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", `${storedItems[i].id}`);
        article.setAttribute("data-color", `${storedItems[i].color}`);
        divImg.setAttribute("class", "cart__item__img");
        img.setAttribute("src", apiProduct.imageUrl);
        img.setAttribute("alt", apiProduct.altTxt);
        divContent.setAttribute("class", "cart__item__content");
        divContentDescription.setAttribute(
          "class",
          "cart__item__content__description"
        );
        divContentSettings.setAttribute(
          "class",
          "cart__item__content__settings"
        );
        divContentSettingsQuantity.setAttribute(
          "class",
          "cart__item__content__settings__quantity"
        );
        pInput.setAttribute("type", "number");
        pInput.setAttribute("class", "itemQuantity");
        pInput.setAttribute("name", "itemQuantity");
        pInput.setAttribute("min", "1");
        pInput.setAttribute("max", "100");
        pInput.setAttribute("value", `${storedItems[i].quantity}`);
        divContentSettingsDelete.setAttribute(
          "class",
          "cart__item__content__settings__delete"
        );
        pDelete.setAttribute("class", "deleteItem");

        /* -------------------------- insertion de texte ------------------------------------- */

        h2.innerText = apiProduct.name;
        pColor.innerText = storedItems[i].color;
        pPrice.innerText = apiProduct.price + " €";
        pQuantité.innerText = "Qté :";
        pDelete.innerText = "Supprimer";

        /* -------------------------- insertion des elements crée dans leurs parents ------------------------------------- */

        cartItems.appendChild(article);
        article.append(divImg, divContent);
        divImg.appendChild(img);
        divContent.append(divContentDescription, divContentSettings);
        divContentDescription.append(h2, pColor, pPrice);
        divContentSettings.append(
          divContentSettingsQuantity,
          divContentSettingsDelete
        );
        divContentSettingsQuantity.append(pQuantité, pInput);
        divContentSettingsDelete.appendChild(pDelete);

        /* -------------------------- fonction à lancer dans le scope de fillCart() car besoin des elements sur le DOM ------------------------------------- */

        deleteItemFn();
        updateQuantity();
      }
    }
  });
};

// additionne le nombre d'items dans le panier
const sumTotals = (apiProducts) => {
  let totalP = 0; // total price
  let totalQ = 0; // total Quantity
  apiProducts.forEach((apiProduct) => {
    for (let i = 0; i < storedItems.length; i++) {
      // récupère la quantité et le prix pour chaque produit affiché sur le DOM (quand l'id de l'api match l'id du storage)
      if (apiProduct._id === storedItems[i].id) {
        // on calcul la quantité
        let quantity = storedItems[i].quantity;
        let quantityParsed = parseInt(quantity);
        totalQ += quantityParsed;
        // on calcul le prix
        let price = apiProduct.price;
        let priceParsed = parseInt(price);
        totalP += priceParsed * storedItems[i].quantity;
      }
    }
    // on met à jour le DOM avec les nouvelles données
    totalQuantity.textContent = totalQ;
    totalPrice.textContent = totalP;
  });
};

// supprime l'item du localstorage et du DOM
const deleteItemFn = () => {
  // array.from sert à acceder à forEach car getElementsByclassname est une HTMLcollection et non une nodelist
  Array.from(deleteItem).forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      // on selectionne l'item a supprimer grace à l'index d'items
      let itemToDelete =
        storedItems[Array.from(deleteItem).indexOf(deleteButton)];
      // on garde tous les items qui sont differents de l'item a supprimer grace à filter()
      storedItems = storedItems.filter(
        (storedItems) => storedItems !== itemToDelete
      );
      // on met à jour dans le localStorage sans l'item à supprimer
      let stringifiedstoredItems = JSON.stringify(storedItems);
      localStorage.setItem("Panier", stringifiedstoredItems);

      deleteButton.closest("article").remove();
      mainCart(); // pour mettre à jour totaux
    });
  });
};

// changer le nombre d'items
const updateQuantity = () => {
  // récupère la quantité d'item par item dans le panier
  Array.from(itemQuantity).forEach((quantity) => {
    quantity.addEventListener("change", () => {
      let newItemQuantity = quantity.value; // nouvelle quantité à chanque input change
      let myItem = quantity.closest("article"); // selectionne la balise article de l'item dont on change la quantité
      for (const item of storedItems) {
        //on vérifie si l'item dont on change la quantité  est présent dans le sotrage
        if (
          item.id === myItem.dataset.id &&
          item.color === myItem.dataset.color
        ) {
          //si oui on change la quantité
          item.quantity = newItemQuantity;
        }
      }
      // et on met à jour dans le localStorage
      let stringifiedStoreditems = JSON.stringify(storedItems);
      localStorage.setItem("Panier", stringifiedStoreditems);

      mainCart(); // pour mettre à jour totaux
    });
  });
};
