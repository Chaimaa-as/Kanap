// Fonctions------------------------------------------------------------------------------------------------------------- 
// Définir l'emplacement de sauvegarde des données (ici localStorage, la base de données locale) 
const storageAccess = localStorage;

// Récupérer les produits dans le localStorage
function kanapsSavedInLocalStorage(){
    const products = storageAccess.getItem("kanapSaved"); 
    if (!products){
        return {}
    } 
    // Récupérer produits sauvegardés (format objet)
    return JSON.parse(products)  
}


// Etablir des conditions pour que l'ajout au panier soit valide
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
function updateKanapsSavedInLocalStorage(products){
    storageAccess.setItem("kanapSaved", JSON.stringify(products)) 
}


// Ajouter un produit au panier
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