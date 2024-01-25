const url = "http://localhost:3000/api/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return addProducts(data);
  });

function addProducts(donnees) {
  const id = donnees[0]._id;
  const imageUrl = donnees[0].imageUrl;
  const altTxt = donnees[0].altTxt;
  const name = donnees[0].name;
  const description = donnees[0].description;

  const image = makeImage(imageUrl, altTxt);
  const anchor = makeAnchor(id);
  const article = makeArticle();
  const h3 = makeH3(name);
  const p = makeParagraphe(description);

  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
  appendChildren(anchor, article);
}

function makeAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

function appendChildren(anchor, article) {
  const items = document.querySelector("#items");
  if (items !== null) {
    items.appendChild(anchor);
    anchor.appendChild(article);
    console.log("éléménts à ajouter à items", items);
  }
}

function makeArticle() {
  const article = document.createElement("article");
  console.log(article);
  return article;
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

function makeH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

function makeParagraphe(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
