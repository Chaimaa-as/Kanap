const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
if (id != null) {
  let itemPrice = 0;
  let imgUrl, altText;
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((result) => handleData(result));

function handleData(canape) {
  const { altTxt, colors, description, imageUrl, name, price } = canape;
  itemPrice = price;
  imgUrl = imageUrl;
  altText = altTxt;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;

  const parent = document.querySelector(".item__img");
  if (parent != null) {
    parent.appendChild(image);
  }
}

function makeTitle(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) {
    h1.textContent = name;
  }
}

function makePrice(price) {
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;
}

function makeDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}

function makeColors(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}

const button = document.querySelector("#addToCart");
if (button != null) {
  button.addEventListener("click", (e) => {
    const colorsSelected = document.querySelector("#colors").value;

    const quantitySelected = document.querySelector("#quantity").value;
    // if (!colorsSelected || !quantitySelected)

    if (
      colorsSelected == null ||
      colorsSelected === "" ||
      quantitySelected == null ||
      quantitySelected == 0
    ) {
      alert("please select a quantity and a color");
      return;
    }
    saveToCart(colorsSelected, quantitySelected);
    window.location.href = "cart.html";
  });
}

function saveToCart(colorsSelected, quantitySelected) {
  const data = {
    id: id,
    color: colorsSelected,
    quantity: Number(quantitySelected),
    price: itemPrice,
    imageUrl: imgUrl,
    altTxt: altText,
  };

  localStorage.setItem(id, JSON.stringify(data));
}
