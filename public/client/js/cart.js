const insertDataToCart = ()=>{
  const tableCart = document.querySelector("[table-cart]");
  if(tableCart){
    fetch("/cart/list",{
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body: localStorage.getItem("cart")
    })
      .then(res => res.json())
      .then(data =>{
        console.log(data.tours)
        const htmlStr = data.tours.map((item, index)=>`
          <tr>
            <td>${index+1}</td>
            <td><img src="${item.image}" alt="${item.title}" width="80px"></td>
            <td><a href="/tours/detail/${item.slug}">${item.title}</a></td>
            <td>${item.price_special.toLocaleString()}đ</td>
            <td><input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px"></td>
            <td>${item.total.toLocaleString()}đ</td>
            <td><button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button></td>
          </tr>
        `);
        const tbody = tableCart.querySelector("tbody");
        tbody.innerHTML = htmlStr.join("");
        const totalPrice = document.querySelector("[total-price]");
        if(totalPrice) {
          totalPrice.innerHTML = data.total.toLocaleString();
        }
      })

  }
}

insertDataToCart();