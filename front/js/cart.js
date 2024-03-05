const cart = [];

retrieveItemsFromLocalStorage();
cart.forEach((item) => displayItem(item));

function retrieveItemsFromLocalStorage() {
  const numberOfItemsInLocalStorage = localStorage.length;
  for (let i = 0; i < numberOfItemsInLocalStorage; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

function displayItem(item) {
  const article = makeArticle(item);
  const imageDiv = makeImageDiv(item);
  article.appendChild(imageDiv);

  // makeCardContent(item);
  const cartItemContent = makeCardContent(item);
  article.appendChild(cartItemContent);
  displayArticle(article);

  displayTotalQuantity();
  displayTotalPrice();
}

function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity");
  const total = cart.reduce((total, item) => total + item.quantity, 0);
  totalQuantity.textContent = total;
}

function displayTotalPrice() {
  // let total = 0;
  const totalPrice = document.querySelector("#totalPrice");

  // Méthode 1
  // cart.forEach((item) => {
  //   const totalUnitPrice = item.price * item.quantity;
  //   total += totalUnitPrice;
  // total = total + totalUnitPrice;
  // });

  // Méthode 2 plus élégante (commenter le total = 0 pour que ça marche)
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // console.log(total);
  totalPrice.textContent = total;
}

function makeCardContent(item) {
  const cardItemContent = document.createElement("div");
  cardItemContent.classList.add("cart__item__content");
  const description = makeDescription(item);
  const settings = makeSettings(item);

  cardItemContent.appendChild(description);
  cardItemContent.appendChild(settings);
  return cardItemContent;
  // cardItemContent.appendChild(settings);
}

function makeSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  addQuantityToSettings(settings, item);
  addDeleteToSettings(settings, item);
  return settings;
}

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => deleteItem(item));

  const p = document.createElement("p");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}

function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );
  cart.splice(itemToDelete, 1);
  console.log(cart);

  displayTotalPrice();
  displayTotalQuantity();
  deleteDataFromLocalStorage(item);
  deleteArticleFromPage(item);
}

function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");

  const p = document.createElement("p");
  p.textContent = "Qté : ";
  quantity.appendChild(p);

  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;

  input.addEventListener("input", () =>
    updatePriceAndQuantity(item.id, input.value, item)
  );

  quantity.appendChild(input);
  settings.appendChild(quantity);
}

function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id);
  itemToUpdate.quantity = Number(newValue);
  item.quantity = itemToUpdate.quantity;
  displayTotalQuantity();
  displayTotalPrice();
  saveNewDataToLocalStorage(item);
}

function deleteDataFromLocalStorage(item) {
  const key = `${item.id}-${item.color}`;
  console.log("on supprime cette key", key);
  localStorage.removeItem(key);
}

function saveNewDataToLocalStorage(item) {
  const dataToSave = JSON.stringify(item);
  // console.log("dataToSave", dataToSave);
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, dataToSave);
}

function makeDescription(item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  p.textContent = item.color;
  const p2 = document.createElement("p");
  p2.textContent = item.price + " €";

  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  // div.appendChild(description);

  return description;
}

function makeArticle(item) {
  const article = document.createElement("article");
  article.classList.add("card__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

function makeImageDiv(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");

  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;

  div.appendChild(image);

  return div;
}
