const url = "http://localhost:3000/api/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return addProducts(data);
  });

function addProducts(donnees) {
  const id = donnees[0]._id;
  const anchor = makeAnchor(id);
  appendChildren(anchor);
}

function makeAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

function appendChildren(anchor) {
  const items = document.querySelector("#items");
  if (items !== null) {
    items.appendChild(anchor);
  }
}
