const url = "http://localhost:3000/api/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const imageUrl = data[0].imageUrl;
    console.log("url de l'image: ", imageUrl);

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.text = "super kanap!";

    const items = document.querySelector("#items");
    if (items !== null) {
      items.appendChild(anchor);
    }
  });
