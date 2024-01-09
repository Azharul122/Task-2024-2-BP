
// DOM content sselect
const cart = document.querySelector(".cart")
const closeCartIcon = document.querySelector(".closeCart")
const cartIcon = document.querySelector(".cart-icon")
const pluseQuantityIcon = document.querySelector(".fa-plus")
const minusQuantityIcon = document.querySelector(".fa-minus")
const addToCartBtnElm = document.querySelector(".addToCartBtn")

const subtotalElm = document.querySelector(".subtotal")
const trashElm = document.querySelector(".fa-trash")
const cartTotalQuantityElm = document.querySelector(".cart-total-quantity")
const ProductListContainerElm = document.querySelector(".product-list-container")
const cartItemsContainerEl = document.querySelector(".cart-items")
let cartItems = []




const displayCart = (e) => {
    e.preventDefault()

    cart.classList.add("translate-x-0")
    cart.classList.remove("translate-x-full")
    cartItemsContainerEl.innerHTML = ""
    displayCartData()
}
const closeCart = (e) => {
    e.preventDefault()

    cart.classList.add("translate-x-full")
    cart.classList.remove("translate-x-0")
}
const handleAddToCart = (e) => {
    e.preventDefault()
    cart.classList.add("translate-x-0")
    cart.classList.remove("translate-x-full")


}


//Event Listner
cartIcon.addEventListener("click", displayCart)
closeCartIcon.addEventListener("click", closeCart)
addToCartBtnElm.addEventListener("click", handleAddToCart)

const displayProductsData = (data) => {
    ProductListContainerElm.innerHTML = '';

    const filterdata = data.filter(fd => fd.Id == cartItems.productId)
    console.log(filterdata)

    if (data.length > 0) {
        data.forEach(product => {
            let newProduct = document.createElement("div");
            let classLists = "card rounded-lg shadow-2xl p-2";


            newProduct.classList.add(...classLists.split(" "));

            newProduct.innerHTML = `
            <img
                class="w-full rounded-lg shadow-slate-200 mb-5 shadow-2xl h-[200px]"
                src="${product.ImageUrl}"
                alt=""
            />
            <p class="w-full mb-2">${product.Name}</p>
            <p class="w-full mb-2">$${product.Price}/each</p>
            <button
                class="addToCartBtn w-full px-3 py-2 rounded-full bg-red-500 text-white"
                onclick="addToCart('${product.Id}', '${product.Name}', '${product.Price}', '${product.ImageUrl}',event)"
            >
                Add to cart
            </button>
        `;


            ProductListContainerElm.appendChild(newProduct);
        });
    }

}
cartTotalQuantityElm.innerText=0
const addToCart = (id, name, price, image,event) => {
    
    let targetElm=event.target
  
    targetElm.classList.add("bg-slate-500");
    targetElm.classList.remove("bg-red-500");

    cart.classList.add("translate-x-0")
    cart.classList.remove("translate-x-full")

    cartItemsContainerEl.innerHTML = ""
    
    

    // const allraedyOne=cartItems.find(cartItem=>cartItem)
    // if (cartItems.length <= 0) {
    //     cartItems = [
    //         {
    //             productId: id,
    //             quantity: 1
    //         }
    //     ]
    // }
    // else if (cartItems.productId != id) {
    //     cartItems.push(
    //         {
    //             productId: id,
    //             quantity: 1
    //         }
    //     )
    // }
    // else {
    //     console.log(`${id} already exist`)
    // }

    // console.log(cartItems)

    const existingCartItem = cartItems.find(cartItem => cartItem.productId === id);

    if (!existingCartItem) {
        cartTotalQuantityElm.innerText=cartItems.length+1
     
        // If the product is not in the cart, add it with a quantity of 1
        cartItems.push({
            productId: id,
            productImage: image,
            productName: name,
            productPrice: price,
            quantity: 1
        });

        
        
        console.log(addToCartBtnElm)
    } else {
        // If the product is already in the cart, log a message
        console.log(`${id} already exists in the cart`);
    }

    console.log(cartItems)
    displayCartData()

}
// const decreaseQuantity = (id) => {

//     // let filterData = cartItems.filter(item => item.productId == id)
//     // let{quantity}=filterData
//     // quantity=quantity+1

//     const index = cartItems.findIndex(item => item.productId == id);

//     // If the item with the given id is found in cartItems
//     if (index !== -1) {
//         // Increase the quantity of that item
//         if (cartItems[index].quantity > 1) {
//             const quntityDisplayElm = document.querySelector(".quntityDisplay")
//             cartItems[index].quantity -= 1;
//             quntityDisplayElm.value = cartItems[index].quantity
//         }


//     }


// }
// const increaseQuantity = (id) => {

//     // let filterData = cartItems.filter(item => item.productId == id)
//     // let{quantity}=filterData
//     // quantity=quantity+1

//     const index = cartItems.findIndex(item => item.productId == id);

//     // If the item with the given id is found in cartItems
//     if (index !== -1) {
//         // Increase the quantity of that item
//         const quntityDisplayElm = document.querySelector(".quntityDisplay")
//         cartItems[index].quantity += 1;
//         quntityDisplayElm.value = cartItems[index].quantity

//     }


// }


const displayCartData = () => {
    let subToatl = 0
    let quantity = 0
    cartItemsContainerEl.innerHTML = '';

    if (cartItems.length > 0) {
        cartItems?.map((cartProduct, index) => {
            subToatl = subToatl + cartProduct.productPrice * cartProduct.quantity
            quantity = quantity + cartProduct.quantity
            // const filterCartData=cartItems.filter(cartItem=>cartItem.productId==cartProduct.Id)

            const cartProduts = document.createElement("div")
            let classLists = "cart-item grid grid-cols-3 items-center gap-2 relative border border-white";


            cartProduts.classList.add(...classLists.split(" "));
            cartProduts.innerHTML = `
            <img src="${cartProduct.productImage}" class="w-full h-[120px] col-span-1" alt="" />
              <div class="col-span-2">
                <p class="text-white mb-2">${cartProduct.productName}</p>
                <p class="text-white mb-1 text-sm">$${cartProduct.productPrice}/each</p>
                <div class="flex items-center">
                  <button
                  onclick="changeQuantity(${index},${cartProduct.quantity + 1})"
                    class="bg-white h-[30px] pl-3 rounded-tl-full rounded-bl-full"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <input
                    class="h-[30px] w-[50px] outline-none text-center font-bold text-red-500 quntityDisplay"
                    type="text"
                    value="${cartProduct.quantity}"
                  />
                  <button
                  onclick="changeQuantity(${index},${cartProduct.quantity - 1})"
                    class="bg-white h-[30px] pr-3 rounded-tr-full rounded-br-full"
                  >
                    <i class="fa-solid fa-minus"></i>
                  </button>
                </div>
              </div>
              <p class="bottom-2 text-white absolute right-2 subtotal">$${cartProduct.productPrice * cartProduct.quantity}</p>
              <div
                class="bg-white absolute -top-2 right-0 p-1 rounded-lg cursor-pointer"
                onclick="deleteFromCart(${index})"
              >
                <i class="fa-solid fa-trash text-red-500 text-xl"></i>
              </div>
            `
            cartItemsContainerEl.appendChild(cartProduts)


        })
    }
    // increaseQuantity()
}

function deleteFromCart(idx) {
    cartTotalQuantityElm.innerText=cartItems.length-1
    cartItems.splice(idx, 1);
    displayCartData()
}

function changeQuantity(idx, quantity) {
    if (quantity >= 1) {
        cartItems[idx].quantity = quantity
        minusQuantityIcon.classList.add("opacity-40")
        displayCartData()
    }



}

const fetchdata = () => {
    fetch("../src/peoducts.json")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            displayProductsData(data)
        })
}
fetchdata()

