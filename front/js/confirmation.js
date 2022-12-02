const orderLab=document.getElementById("orderId")

const urlParams = (new URL(location)).searchParams;
const orderId = urlParams.get("orderId");

orderLab.innerText=orderId