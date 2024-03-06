const cart = [];

retrieveItemsFromLocalStorage();
cart.forEach((item) => displayItem(item));

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

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

function submitForm(e) {
  e.preventDefault(); // pour pas que ça se rafraichisse dès qu'on clique sur le bouton

  if (cart.length === 0) {
    alert("veuillez choisir un produit");
    return;
  }

  if (isFormInvalid()) return;
  if (isEmailInvalid()) return;

  const body = makeRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href =
        "/front/html/confirmation.html" + "?orderId=" + orderId;
      console.log(data);
    })
    .catch((err) => console.erreur(err));
}

function isEmailInvalid() {
  const email = document.querySelector("#email").value;
  const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  if (regex.test(email) === false) {
    alert("veuillez entrer une adresse email valide");
    return true;
  }
  return false;
}

function isFormInvalid() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("veuillez compléter tous les champs");
      return true;
    }
    return false;
  });
}

function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromLocalStorage(),
  };
  console.log(body);
  return body;
}

function getIdsFromLocalStorage() {
  const numberOfProducts = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i);
    console.log(key);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}
