// Fonctions------------------------------------------------------------------------------------------------------------- 
// Définir l'emplacement de sauvegarde des données (ici localStorage, la base de données locale) 
const storageAccess = localStorage

// RECUPERER LES KANAPS DANS LOCAL STORAGE
function kanapsSavedInLocalStorage(){
    const products = storageAccess.getItem("kanapSaved") 
    if (!products){
        return {}
    } 
    // Récupérer produits sauvegardés (format objet)
    return JSON.parse(products)  
}

// Conditions pour que l'ajout au panier soit valide
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


// FONCTION POUR METTRE A JOUR LES KANAPS STOCKES DANS LE LOCAL STORAGE (transformer objet JSON en string pour pouvoir le stocker)
function updateKanapsSavedInLocalStorage(products){
    /* if (products[id]){
        if (products[id]){
            products[id] = parseInt(products[id]) + parseInt(quantity)
             // update en recuperant l'ancienne quantité
        } else {
            products[id] = parseInt(quantity)
        }
    }
    if (!products[id]){
        products[id] = {
            // Si non présent -> ajouter quantité sélectionnée
            [color]:parseInt(quantity)
        }
    } */
    storageAccess.setItem("kanapSaved", JSON.stringify(products)) 

}

// FONCTION POUR AJOUTER AU PANIER
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


//{"107fb5b75607497b96722bda5b504926":{"Blue":1},"415b7cacb65d43b2b5c1ff70f3393ad1":{"Black/Yellow":1,"Black/Red":1}}


//Supprimer produit_ATTENTION NE PAS PRENDRE QU'ID SINON SUPPRESSION TOUS LES PROPRIO PRODUITS
function removeProductFromLocalStorage (productId, productColor){ 
    //ETAPE 1 Récupérer les éléments qui ont été changés grâce à l'eventListener change dans cart : article
    let products = kanapsSavedInLocalStorage();
    let product=products[productId][productColor]
    if (product){
        delete products[productId][productColor]
        if(Object.keys(products[productId]).length===0)
            delete products[productId]
    }
    

    //products = myNewProducts

    
    // products = products.filter(products => products[productId][productColor] != productId);
    // delete products[productId][productColor]


    updateKanapsSavedInLocalStorage(products) 
}

function modifyQuantityInLocalStorage(productId,productColor,productQuantity){
    let products = kanapsSavedInLocalStorage();
    if(productQuantity===0){
        removeProductFromLocalStorage(productId,productColor)
        
    }
    else{
        products[productId][productColor] = productQuantity;
        updateKanapsSavedInLocalStorage(products) 
    }
    drawCart()
}


//Fonction pour modifier quantité article

    /* 
    const testQty = document.getElementsByClassName("cart__item__content__settings__quantity")
    Pour la fonctionnalité de modification de quantité, il faut suivre le même schéma en changeant le type de l'écouteur d'événements 
    et en vérifiant que l'utilisateur a bien rempli le champ dédié à la quantité.

ETAPE 1   
        Condition canModify quantité avant fonction:

            SI le champ quantité === null
                alert("")

            SI le champ quantité est rempli
                récupérer valeur de l'input quantité
                récupérer le prix correspondant // lier input quantité + price
                multiplier ces 2 valeurs               
                    variable quantité * variable price par id associée


            SI on clique et que le résultat est inférieur à la quantité stockée
                alors on décremente de 1
                    SI il reste 0 (-1) 
                        -> kanap supprimé 
                    SI résultat supérieur à la quantité stockée et inférieur à 100
                        alors on incrémente de 1


ETAPE 2
function modifyQuantityInLocalStorage (productId, productColor){ 
    SI (la condition canModify est remplie()){

                mettre à jour la quantité dans localStorage
    
    updateKanapsSavedInLocalStorage(products)
}
----------------------------------------------------------------------------------------------------------------------------------*/


// FONCTION POUR AFFICHER LE PRIX TOTAL 


// FONCTION POUR SAUVEGARDER PANIER
/*
function saveCart(){ 
    // localStorage.setItem("kanapOrdered", JSON.stringify(kanapOrdered))
}
*/

//LocalStorage
   /* 
    objet kanapSaved = {
           "id" : "107fb5b75607497b96722bda5b504926",
           sous-objet de "id" = {
               "colors" = {
                   ["color1", "color2"],
                   sous-objet de "colors" ={
                       "quantity" : value
   
   
           "107fb5b75607497b96722bda5b504926":{"Blue":1,"Black":2},
           idPage : [selectedColor1.value : selectedQty1.value, selectedColor1.value : selectedQty1.value]
       */