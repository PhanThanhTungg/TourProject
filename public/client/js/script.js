// alert-add-cart-susscess
const alertAddCartSusscess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-susscess]");
  if(elementAlert) {
    elementAlert.classList.remove("alert-hidden");
    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);
  }
}
// End alert-add-cart-susscess

// update quantity for mini-cart 
const showMiniCart = ()=>{
  const miniCart = document.querySelector("[mini-cart]");
  if(miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length || "0";
  }
}
const cart = localStorage.getItem("cart");
if(!cart) localStorage.setItem("cart", JSON.stringify([]));
// end-update quantity for mini-cart

const formAddToCart = document.querySelector("[form-add-to-cart]");
if(formAddToCart){
  formAddToCart.addEventListener("submit", e=>{
    e.preventDefault();
    const tourId = formAddToCart.getAttribute("tour-id");
    const quantity = e.target.quantity.value;
    if(tourId && quantity){
      const cart = JSON.parse(localStorage.getItem("cart"));
      const checkIndex = cart.findIndex(item=> item.tourId == tourId);
      if(checkIndex!=-1) cart[checkIndex].quantity += parseInt(quantity);
      else cart.push({
        tourId: tourId,
        quantity: parseInt(quantity)
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      alertAddCartSusscess();
      showMiniCart();
    }
  })
}

showMiniCart();

