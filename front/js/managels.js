// Ce code est destiné à gérer un panier d'achat pour un site e-commerce 
// qui vend des canapés (appelés "kanaps" ici). Le code utilise le localStorage 
// pour stocker les informations sur les canapés ajoutés au panier.

// Définir l'emplacement de sauvegarde des données (ici localStorage, la base de données locale) 
// 1. `storageAccess`: Une constante pour accéder au localStorage.
const storageAccess = localStorage;

// Récupérer les produits dans le localStorage
// 2. `kanapsSavedInLocalStorage()`: Cette fonction récupère les canapés sauvegardés 
// dans le localStorage. Si aucun canapé n'est sauvegardé, un objet vide est retourné. 
// Sinon, les canapés sont retournés sous forme d'objet.
function kanapsSavedInLocalStorage(){
    const products = storageAccess.getItem("kanapSaved"); 
    if (!products){
        return {}
    } 
    // Récupérer produits sauvegardés (format objet)
    return JSON.parse(products)  
}

// Etablir des conditions pour que l'ajout au panier soit valide
// 3. `canAddToCart()`: Cette fonction vérifie si les conditions pour ajouter un canapé 
// au panier sont remplies. Les conditions sont que la quantité soit comprise entre 1 et 100 
// et qu'une couleur ait été choisie. Si les conditions sont remplies, 
// la fonction retourne `true`, sinon elle affiche une alerte et retourne `false`.
function canAddToCart(){
    if (selectQuantity.value < 1 || selectQuantity.value >=100){
        alert('Veuillez choisir une quantité comprise entre 1 et 100');
        return false
    }
    if (selectColors.value == null || selectColors.value ==""){
        alert('Veuillez choisir une couleur');
        return false
    } 
    return true;
}

// Mettre à jour les produits stckés dans le localStorage (transformer objet JSON en string pour pouvoir le stocker)
// 4. `updateKanapsSavedInLocalStorage(products)`: Cette fonction met à jour les canapés sauvegardés
// dans le localStorage. Elle prend en argument les produits (sous forme d'objet) 
// et les transforme en chaîne JSON pour les stocker dans le localStorage.
function updateKanapsSavedInLocalStorage(products){
    storageAccess.setItem("kanapSaved", JSON.stringify(products)) 
}

// Ajouter un produit au panier
// 5. `addToCart(id, color, quantity)`: Cette fonction ajoute un canapé au panier. 
// Elle prend en argument l'ID, la couleur et la quantité du canapé à ajouter. 
// Elle récupère d'abord les canapés sauvegardés dans le localStorage, 
// puis vérifie si le canapé avec l'ID donné existe déjà. Si c'est le cas, 
// elle met à jour la quantité pour cette couleur. Sinon, elle crée un nouvel objet avec l'ID, 
// la couleur et la quantité, puis met à jour le localStorage.
function addToCart(id, color, quantity){
    const products = kanapsSavedInLocalStorage();
    if (products[id]){
        if (products[id][color]){
            products[id][color] = parseInt(products[id][color]) + parseInt(quantity);
             // update en recuperant l'ancienne quantité
        } else {
            products[id][color] = parseInt(quantity);
        }
    }
    if (!products[id]){
        products[id] = {
            [color]:parseInt(quantity)
        }
    }
    updateKanapsSavedInLocalStorage(products)
}

//Supprimer un produit_ATTENTION NE PAS PRENDRE QU'ID SINON SUPPRESSION TOUS LES PROPRIO PRODUITS
// 6. `removeProductFromLocalStorage(productId, productColor)`: 
// Cette fonction supprime un canapé du localStorage. Elle prend en argument l'ID 
// et la couleur du canapé à supprimer. 
// Elle récupère d'abord les canapés sauvegardés dans le localStorage, 
// puis vérifie si le canapé existe. Si c'est le cas, 
// elle supprime la couleur du canapé (ou tout le canapé si c'est la seule couleur) 
// et met à jour le localStorage.
function removeProductFromLocalStorage (productId, productColor){ 
    //Récupérer les éléments qui ont été changés grâce à l'eventListener dans cart 
    let products = kanapsSavedInLocalStorage();
    let product=products[productId][productColor]
    if (product){
        if(Object.keys(products[productId]).length > 1){
            delete products[productId][productColor];
        } else {
            delete products[productId];
        }
    }
    updateKanapsSavedInLocalStorage(products) 
}

//Modifier la quantité des produits
// 7. `modifyQuantityInLocalStorage(productId, productColor, productQuantity)`: 
// Cette fonction modifie la quantité d'un canapé dans le localStorage. 
// Elle prend en argument l'ID, la couleur et la nouvelle quantité du canapé. 
// Si la nouvelle quantité est 0, elle supprime le canapé du localStorage 
// en utilisant la fonction `removeProductFromLocalStorage()`. 
// Sinon, elle met à jour la quantité pour cette couleur et met à jour le localStorage 
// en utilisant la fonction `updateKanapsSavedInLocalStorage()`.
function modifyQuantityInLocalStorage(productId,productColor,productQuantity){
    let products = kanapsSavedInLocalStorage();
    if(productQuantity===0){
        removeProductFromLocalStorage(productId,productColor)
    }
    else{
        products[productId][productColor] = productQuantity;
        updateKanapsSavedInLocalStorage(products) 
    }
}








