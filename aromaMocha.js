let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "Expresso",
        tag: "Expresso",
        price: 9,
        incart: 0
    },
    {
        name: 'Irish Coffee',
        tag: 'Irish-Coffee',
        price: 14,
        incart: 0
    },
    {
        name: 'Cappuccino',
        tag: 'Cappuccino',
        price: 12,
        incart: 0 
    },
    {
        name: 'Classic Hot Chocolate',
        tag: 'hot-chocolate',
        price: 10,
        incart: 0
    },
    {
        name: 'Mocha Latte',
        tag: 'Mocha Latte',
        price: 15,
        incart: 0
    },
    {
        name: 'Sizzling Brownie with Ice cream',
        tag: 'brownie',
        price: 15,
        incart: 0
    }
]

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers'); 
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }   
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }
    else{
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    if(productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(product);
}



function totalCost(product){
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);

    if(cartCost !=null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
                <span>${item.incart}</span>
                <ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.incart * item.price}
            </div>
            `
            
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}
                </h4>
        `
    }
}

onLoadCartNumbers();
displayCart();