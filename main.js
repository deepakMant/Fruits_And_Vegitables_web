// casrole slider start
var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// casrole slider End

// humburger navbar start
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};
// humburger navbar end

// fatch  all product  start

var filepath = "product.json";
var productlist;
var producthtml = "";

async function loadJson(jsonFile) {
  fetch(jsonFile)
    .then((res) => res.json())
    .then((json) => {
      productlist = json;
      productlist.products.forEach((product) => {
        producthtml = `<div class="box" id="${product.id}">
    <img src="./Assets/image/pro${product.id}.png" alt="">
    <span>Fresh Items</span>
    <h2>Faram fresh organic <br>fruits 250g</h2>
    <h3 class="price">$${product.price} <span>/kg</span></h3>
    <i class="bx bx-cart-alt" onclick="storedCartId('${encodeURI(
      JSON.stringify(product)
    )}')"></i>
    <i class="bx bx-heart" onclick="storedwishId('${encodeURI(
      JSON.stringify(product)
    )}')"></i>
    <span class="discount">-25%</span>
   </div>`;

        document.querySelector("#products-container").innerHTML += producthtml;
      });
    });
}

loadJson(filepath);
// fatch  all product  end

// add to cart function  start

let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
let wishLIst = JSON.parse(window.localStorage.getItem("wishLIst")) || [];

var slidepoint = document.querySelector(".slider");

function storedCartId(selectedProduct) {
  var selectedProduct = JSON.parse(decodeURI(selectedProduct));

  var match2 = match(cart, selectedProduct);
  if (match2 == "no") {
    cart.push({
      ...selectedProduct,
      qty: 1,
    });
  } else {
    var Qty = 1;
    cart[match2].qty += Qty;
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
  cartItemCount();
  opencart();
  slidepoint.classList.add("slideranimation");
}

// add to cart function  end

// matching prodoct start
function match(arr, selectedProduct) {
  var x = "no";
  for (let index in arr) {
    if (arr[index].id == selectedProduct.id) {
      x = index;
    }
  }
  return x;
}

// matching prodoct start end

// cart item count start
function cartItemCount() {
  if (cart.length > 0) {
    document.querySelector("#addcart .cartcount").style.display = "block";
    document.querySelector("#addcart span").innerHTML = cart.length;
  } else {
    document.querySelector("#addcart .cartcount").style.display = "none";
    slidepoint.classList.remove("slideranimation");
  }
}
cartItemCount();

// cart item count end

// wish list item count start
function wishListItemCount() {
  if (wishLIst.length > 0) {
    document.querySelector("#wishlist .cartcount").style.display = "block";
    document.querySelector("#wishlist span").innerHTML = wishLIst.length;
  } else {
    document.querySelector("#wishlist .cartcount").style.display = "none";
    slidepoint.classList.remove("slideranimation");
  }
}

wishListItemCount();

// cart item count end

// wishkist

function storedwishId(selectedProduct) {
  var selectedProduct = JSON.parse(decodeURI(selectedProduct));

  var match1 = match(wishLIst, selectedProduct);
  if (match1 == "no") {
    wishLIst.push({
      ...selectedProduct,
    });
  }
  window.localStorage.setItem("wishLIst", JSON.stringify(wishLIst));
  wishListItemCount();
  openwishlist();
  slidepoint.classList.add("slideranimation");
}

// cart product list view

var cartproductHTML = "";
function opencart() {
  var totalPrice = 0;
  cartProduct = JSON.parse(window.localStorage.getItem("cart"));
  slidepoint.innerHTML = "";
  slidepoint.innerHTML = `<div class="box ">
    <div class="inside_box">
    <div class="total_price">
        <p>Total Price </p>
        <span>$</span>
       </div>
       <a href="#products" class="btn" onclick="pymentMood()">Place Order <i class="bx bx-right-arrow-alt"></i></a>
    </div>
    </div>`;
  cartProduct.forEach((pro) => {
    cartproductHTML = ` <div class="box">
    <div class="inside_box">
        <img src="./Assets/image/pro${pro.id}.png" alt="">
    <div class="text_box">
        <span>Fresh Items</span>
        <h2>Faram fresh organic <br>fruits 250g</h2>
        <div class="proQty">
        <i class='bx bx-minus' onclick="minus('${encodeURI(
          JSON.stringify(pro)
        )}')"></i>
        <span>${pro.qty}</span>
        <i class='bx bx-plus' onclick="plus('${encodeURI(
          JSON.stringify(pro)
        )}')"></i>
        </div>
       <div class="removeBtn">
        <h3 class="price priceSize">$${
          pro.price * pro.qty
        } <span>/kg</span></h3>
       </div>
    </div>
    </div>
    <i class="bx bx-heart" onclick="addToWishList('${encodeURI(
      JSON.stringify(pro)
    )}',${pro.id})"></i>
    <div class="bx bx-menu bx-x " onclick="removeproduct(${pro.id})"></div>
    <span class="discount">-25%</span>1
   </div>`;
    totalPrice += pro.price * pro.qty;

    document.querySelector(".total_price span").innerHTML = "$" + totalPrice;

    slidepoint.innerHTML += cartproductHTML;
  });

  slidepoint.classList.toggle("slideranimation");

  count = 1;
}

// increese and decrese Qunatity star

function plus(pro) {
  storedCartId(pro);
}

// decrese quantity
function minus(selectedProduct) {
  var selectedProduct = JSON.parse(decodeURI(selectedProduct));

  var match2 = match(cart, selectedProduct);
  if (match2 == "no") {
    cart.push({
      ...selectedProduct,
      qty: 1,
    });
  } else {
    var Qty = 1;
    if (cart[match2].qty > 1) cart[match2].qty -= Qty;
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
  cartItemCount();
  opencart();
  slidepoint.classList.add("slideranimation");
}

// move product from cart vto wishlist
function addToWishList(pro, id) {
  storedwishId(pro);
  removeproduct(id);
}

// remove item function
function removeItem(arr, id) {
  let x = arr.filter((product) => {
    if (product.id == id);
    else return product;
  });
  return x;
}

// remove cart product
function removeproduct(id) {
  cart = removeItem(cart, id);
  window.localStorage.setItem("cart", JSON.stringify(cart));
  opencart();
  slidepoint.classList.add("slideranimation");
  cartItemCount();
}

// show wish list prodct
var wishListproductHTML = "";
function openwishlist() {
  cartProduct = JSON.parse(window.localStorage.getItem("wishLIst"));
  slidepoint.innerHTML = "";
  cartProduct.forEach((pro) => {
    wishListproductHTML = ` <div class="box">
    <div class="inside_box">
        <img src="./Assets/image/pro${pro.id}.png" alt="">
    <div class="text_box">
        <span>Fresh Items</span>
        <h2>Faram fresh organic <br>fruits 250g</h2>
       <div class="removeBtn">
        <h3 class="price">$${pro.price} <span>/kg</span></h3>
       </div>
    </div>
    </div>
    <i class="bx bx-cart-alt"onclick="addToCart('${encodeURI(
      JSON.stringify(pro)
    )}',${pro.id})"></i>
    <div class="bx bx-menu bx-x " onclick="removepro(${pro.id})"></div>
    <span class="discount">-25%</span>
   </div>`;
    slidepoint.innerHTML += wishListproductHTML;
  });

  slidepoint.classList.toggle("slideranimation");
}

// move product from wishlist to cart
function addToCart(pro, id) {
  storedCartId(pro);
  removepro(id);
}

// remove wishList product
function removepro(id) {
  wishLIst = removeItem(wishLIst, id);
  window.localStorage.setItem("wishLIst", JSON.stringify(wishLIst));
  openwishlist();
  slidepoint.classList.add("slideranimation");
  wishListItemCount();
}

//  paymen mood page  start

function pymentMood() {
  let t_peice = document.querySelector(".total_price span").innerHTML;
  slidepoint.innerHTML = "";
  slidepoint.innerHTML = `<div class="box ">
 <div class="inside_box">
 <div class="total_price">
     <p>Total Price </p>
     <span>${t_peice}</span>
    </div>
    <a href="#products" class="btn" onclick="thankyou()">PAY <i class="bx bx-right-arrow-alt"></i></a>
 </div>
 </div>
 
 <div class="box paymoad">
            <div class="inside_box">
           <input type="radio" name="pay">
           <p>Debit Card</p>
           <img src="./Assets/image/Image 38.png" alt="">
            </div>
            </div>
            
            <div class="box paymoad">
                <div class="inside_box">
               <input type="radio" name="pay">
               <p>Credit Card</p>
               <img src="./Assets/image/Image 39.png" alt="">
                </div>
                </div>

                <div class="box paymoad">
                    <div class="inside_box">
                   <input type="radio" name="pay">
                   <p>VISA Card</p>
                   <img src="./Assets/image/Image 40.png" alt="">
                    </div>
                    </div>

                    <div class="box paymoad">
                        <div class="inside_box">
                       <input type="radio" name="pay">
                       <p>UPI</p>
                       <img src="./Assets/image/Image 41.png" alt="">
                        </div>
                        </div>

                        <div class="box paymoad">
                            <div class="inside_box">
                           <input type="radio" name="pay">
                           <p>Net Banking</p>
                           <img src="./Assets/image/Image 42.png" alt="">
                            </div>
                            </div>`;
}

// tnank you page

function thankyou() {
  cart = [];
  window.localStorage.setItem("cart", JSON.stringify(cart));
  cartItemCount();
  slidepoint.innerHTML = "";
  slidepoint.innerHTML = `<div class="box thankPage">
 <div class="thankyou">
     <p>Thank</p>
     <p>You!</p>
     <a href="#products" class="btn" onclick="continueShop()"
       >Continue Shoping <i class="bx bx-right-arrow-alt"></i
     ></a>
 </div>
</div>`;
  slidepoint.classList.add("slideranimation");
}

// continue shopping

function continueShop() {
  slidepoint.classList.toggle("slideranimation");
}
