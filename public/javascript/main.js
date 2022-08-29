const body = document.querySelector('body');
    if(body.classList.contains('webshop-page')) {
        let cartIcon = document.querySelector('#cart-icon');
        let cart = document.querySelector('.cart');
        let closeCart = document.querySelector('#close-cart');
        let shop = document.querySelector('.shopcontainer');
        let navbar = document.querySelector('.navbar-shop');
        let footer = document.querySelector('footer');

        cartIcon.onclick = () => {
            cart.classList.add("active");
            shop.classList.add("active");
            navbar.classList.add("active");
            footer.classList.add("active")
        }

        closeCart.onclick = () => {
            cart.classList.remove("active");
            shop.classList.remove("active");
            navbar.classList.remove("active");
        }

        ready();

        function ready() {
            removeCartButton = document.getElementsByClassName('cart-remove');
            for (var i = 0; i < removeCartButton.length; i++) {
                var button = removeCartButton[i];
                button.addEventListener('click', removeCartItem);
            }
            var quantityInputs = document.getElementsByClassName('cart-quantity');
            for (var i = 0; i < quantityInputs.length; i++) {
                var input = quantityInputs[i];
                input.addEventListener('change', Changequantity);
            }
            var addCart = document.getElementsByClassName('cart-add');
            for (var i = 0; i < addCart.length; i++) {
                var button = addCart[i];
                button.addEventListener('click', clickedAddCart);
            }
            document.getElementsByClassName('buy-button')[0].addEventListener('click', clickedPurchaseButton);
        }

        function clickedPurchaseButton() {
            alert('Your order has been succesfully placed')
            var cartContent = document.getElementsByClassName('cart-content')[0];
            while (cartContent.hasChildNodes()) {
                cartContent.removeChild(cartContent.firstChild);
            }
            updateTotal();
        }

        function removeCartItem(event) {
            var clickedButton = event.target;
            clickedButton.parentElement.remove();
            updateTotal();
        }

        function Changequantity(event) {
            var input = event.target;
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            updateTotal();
        }

        function clickedAddCart(event) {
            var button = event.target;
            var shopProducts = button.parentElement;
            var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
            var price = shopProducts.getElementsByClassName('price')[0].innerText;
            var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
            addToCart(title, price, productImg);
            updateTotal();
        }

        function addToCart(title, price, productImg) {
            var cartShopBox = document.createElement('div');
            cartShopBox.classList.add('cart-box')
            var cartItems = document.getElementsByClassName('cart-content')[0];
            var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
            for (var i = 0; i < cartItemsNames.length; i++) {
                if (cartItemsNames[i].innerText === title) {
                    alert("This item is already in your cart.")
                    return;
                }
            }
            var cartBoxContent = `<img src="${productImg}" class="cart-img" alt="Picture of the game ${title}">
                <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <i class="fa-solid fa-trash-can cart-remove"></i>`;

            cartShopBox.innerHTML = cartBoxContent;
            cartItems.append(cartShopBox);
            cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
            cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', Changequantity);
        }

        function updateTotal() {
            var cartContent = document.getElementsByClassName('cart-content')[0];
            var cartBoxes = cartContent.getElementsByClassName('cart-box');
            var total = 0;
            for (var i = 0; i < cartBoxes.length; i++) {
                var cartBox = cartBoxes[i];
                var priceElement = cartBox.getElementsByClassName('cart-price')[0];
                var price = parseFloat(priceElement.innerText.replace("€", ""))
                var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
                var quantity = quantityElement.value;
                total = total + (price * quantity);
            }
            total = Math.round(total * 100) / 100;
            document.getElementsByClassName('total-price')[0].innerText = '€' + total;
        }
    }else if(body.classList.contains('contactpagina')){
        document.getElementsByClassName('submit-button')[0].addEventListener('click', submitButtonClicked);
        function submitButtonClicked() {
            let contactname = document.getElementById('name').value;
            let contactemail = document.getElementById('email').value;
            let contactmessage = document.getElementById('message').value;
            if(contactname === "" || contactemail === "" || contactmessage === ""){
                document.getElementById("submit-button").type = "button";
                alert("Fill in the form correctly")
            }else {
                document.getElementById("submit-button").type = "submit";
                alert('Thank you ' + contactname + '. Your message has been succesfully sent with ID #' +
                    Math.floor(100000 + Math.random() * 900000));}
            }
    }