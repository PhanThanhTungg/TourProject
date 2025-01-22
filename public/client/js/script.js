const cart = localStorage.getItem("cart");
if(!cart) localStorage.setItem("cart", JSON.stringify([]));


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
    }
  })
}