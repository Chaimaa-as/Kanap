// Définir l'emplacement de sauvegarde des données (ici localStorage, la base de données locale) 
const storageAccess = localStorage




// FONCTION POUR RECUPERER LES KANAPS DANS LOCAL STORAGE

function kanapsSavedInLocalStorage(){

    const products = storageAccess.getItem("kanapSaved")  
    // Récupérer produits sauvegardés (format string)

    // for (let i = 0; i < products; i++){
    //     addToCart.push(products)
    // }
    // boucle à créer

    if (!products){
        
        return {}
        // il arrete la fonction ici
    } 

    return JSON.parse(products)  
    // Récupérer produits sauvegardés (format objet)

}

// Fonctions------------------------------------------------------------------------------------------------------------- 

function canAddToCart(){
    if (selectQuantity.value < 1 || selectQuantity.value >=100){
        alert('Veuillez choisir une quantité valide');
        return false
    }
    
    if (selectColors.value == null || selectColors.value ==""){
        alert('Veuillez choisir une couleur valide');
        return false
    } 
    return true;
}




// FONCTION POUR METTRE A JOUR LES KANAPS STOCKES DANS LE LOCAL STORAGE (transformer objet JSON en string pour pouvoir le stocker)
function updateKanapsSavedInLocalStorage(products){
    storageAccess.setItem("kanapSaved", JSON.stringify(products)) 
}







// FONCTION POUR AJOUTER AU PANIER
function addToCart(id, color, quantity){
    const products = kanapsSavedInLocalStorage()
    // console.log(article)
    if (products[id]){
        if (products[id][color]){
            products[id][color] = parseInt(products[id][color]) + parseInt(quantity)
             // update en recuperant l'ancienne quantité
        } else {
            products[id][color] = parseInt(quantity)
        }

    }

    if (!products[id]){
        products[id] = {
            [color]:parseInt(quantity)

        }

    }

    updateKanapsSavedInLocalStorage(products)
}


