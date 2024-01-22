const url = "http://localhost:3000/api/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => addProducts(data));

function addProducts(donnees) {
  const imageUrl = donnees[0].imageUrl;

  const anchor = document.createElement("a");
  anchor.href = imageUrl;
  anchor.text = "super kanap!";
  const items = document.querySelector("#items");
  if (items !== null) {
    items.appendChild(anchor);
    console.log("nous avons bien ajouté le lien");
  }
}
