const url = "http://localhost:3000/api/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data));

const anchor = document.createElement("a");
anchor.href = "http://localhost:3000/images/kanap01.jpeg";
anchor.text = "super kanap!";

const items = document.querySelector("#items");
// items.appendChild(anchor);
// ou
if (items !== null) {
  items.appendChild(anchor);
}
