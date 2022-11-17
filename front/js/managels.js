// Définir l'emplacement de sauvegarde des données (ici localStorage, la base de données locale) 
const storageAccess = localStorage

// {id : { selectedColor : selectedQuantity}, id : {selectedColor : selectedQuantity}}
// function createArticleInCartItems(){
//     const article = document.createElement("article")
//     article.classList.add("cart__item")
//     article.dataset.id = cartItem.id
//     article.dataset.color = cartItem.color
//     return article
// }
// 0: 
// altTxt:"Photo d'un canapé bleu, deux places"
// colors: (3) ['Blue', 'White', 'Black']
// description : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// imageUrl: "http://localhost:3000/images/kanap01.jpeg"
// name: "Kanap Sinopé"
// price: 1849
// _id:"107fb5b75607497b96722bda5b504926"
// [[Prototype]]: Object
// FONCTION POUR RECUPERER LES KANAPS DANS LOCAL STORAGE

function kanapsSavedInLocalStorage(){

    const products = storageAccess.getItem("kanapSaved")  
    // const item = kanapsSavedInLocalStorage.key(i)
    // Récupérer produits sauvegardés (format string)

    // for (let i = 0; i < products; i++){
    //     addToCart.push(products)
    // }

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
/* Conditions pour ajouter les articles au panier : 
1 : définir une fonction "canAddToCart" pour quantité (if (selectQuantity.value >= 1 && selectQuantity.value <=100))
2 : définir une fonction "canAddToCart" pour couleur (if (selectColors.value != null && selectColors.value !=""))
3 : si les conditions sont remplies => OK // TRUE && TRUE => TRUE
*/


// Fonctions FIN-----------------------------------------------------------------------------------------------------------  




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


