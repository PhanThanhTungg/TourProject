// book tours 
const formOrder = document.querySelector("[form-order]");
if(formOrder) {
  formOrder.addEventListener("submit", (event) => {
    event.preventDefault();

    const dataFinal = {
      info: {
        fullName: event.target.fullName.value,
        phone: event.target.phone.value,
        note: event.target.note.value
      },
      cart: JSON.parse(localStorage.getItem("cart"))
    };

    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataFinal)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
  })
}



// end - book tours