const orderId = getOrderId();
displayOrderId(orderId);
clearLocalStorage();

function getOrderId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}

function displayOrderId() {
  const orderIdElement = document.querySelector("#orderId");
  orderIdElement.textContent = orderId;
}

function clearLocalStorage() {
  const localStorage = window.localStorage;
  localStorage.clear();
}
