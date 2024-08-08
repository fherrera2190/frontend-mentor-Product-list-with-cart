let data = [];
let cart = [];
const cartSection = document.querySelector(".cart");
const products = document.querySelector(".products");
const productsButtons = document.querySelectorAll(".button__add");

const noProducts = `<div class="cart-empty-product">
          <figure>
            <img src="./assets/images/illustration-empty-cart.svg" alt="" />
            <figcaption>
            <small>your added items will appear here</small>
            </figcaption></figure></div>`;
const buttons = (id) => {
  if (!existCart(id)) {
    return `<div class="btn_product card__button" id="button-content-${id}" ><button class="button__add increment"  id="increment-button-${id}">
    <img src="./assets/images/icon-add-to-cart.svg" alt="cart icon" />
    <p class="card__text">Add to cart</p>
    </button></div>`;
  }
  const product = existProductOnCart(id);
  return `<div class="btn_product card__button__quantity"id="button-content-${id}" ><button class="decrement" id="decrement-button-${id}">
        <img src="./assets/images/icon-decrement-quantity.svg" alt="cart icon" />
      </button>
      <p class="card__text" id="quantity-${id}">${product.quantity}</p>
      <button class="increment" id="increment-button-${id}">
        <img src="./assets/images/icon-increment-quantity.svg" alt="cart icon" />
      </button></div>`;
};

const productElement = (image, name, category, price, id) => {
  return (
    `<div class="card">
  <div class="card__header">
    <picture>
    <source srcset="${image.desktop}" media="(min-width: 769px)">
    <source srcset="${image.tablet}"
        media="(max-width: 768px) and (min-width: 376px)">
      <img src="${image.mobile}" alt="product image" class="card__image" />
    </picture>
    ` +
    buttons(id) +
    `

  </div>
  <div class="card__body">
    <p><small class="card__category">${category}</small></p>
    <h5 class="card__name">${name}</h6>
  </div>
  <div class="card__footer">
    <h5 class="card__price"><b>$${price}</b></h5>
  </div>
</div> `
  );
};

const productCartElement = (id) => {
  let product = existProductOnCart(id);
  if (!product) return;
  quantity = product.quantity;
  product = getProductInfo(id);
  return `<div class="product-select">
            <div class="product-detail">
              <h5 class="product-name">${product.name}</h5>
              <div class="product-total">
                <p class="product-quantity"><small>${quantity}x</small></p>
                <p class="product-price"><small>@ $${product.price}</small></p>
                <p class="product-total-price"><small>$${
                  quantity * product.price
                }</small></p>
              </div>
            </div>
            <button>
              <img
                src="./assets/images/icon-remove-item.svg"
                alt="delete icon"
              />
            </button>
          </div>`;
};

const totalCart = () => {
  return `<div class="cart-total">
            <p><small>Order Total</small></p>
            <h4 class="total-price">$${getTotal()}</h4>
          </div>
          <div class="delivery">
            <div>
              <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
            </div>
            <p>
              <small>This is a <b>carbon-neutral</b> delivery</small>
            </p>
          </div>
          <button class="confirm-button" id="confirmOrder">
            Confirm Order
          </button>`;
};

// CART FUNCTIONS
function drawCart() {
  cartSection.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((item) => {
      cartSection.innerHTML += productCartElement(item.id);
    });
    cartSection.innerHTML += totalCart();
  } else {
    cartSection.innerHTML = noProducts;
  }
}
function existCart(id) {
  return cart.some((item) => +item.id === +id);
}

function existProductOnCart(id) {
  return cart.find((item) => +item.id === +id);
}

function addToCart(id) {
  if (!id) return;
  if (existCart(id)) {
    console.log("Entre al updateQuantity");
    cart = incrementUnit(id);
    updateQuantity(id);
  } else {
    console.log("Entre al updateBUton");
    cart.push({ id, quantity: 1 });
    updateButtonContent(id);
  }
  saveCartLC();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
}

function incrementUnit(id) {
  return cart.map((item) => {
    if (item.id === id) {
      item.quantity++;
      return item;
    } else {
      return item;
    }
  });
}

function getTotal() {
  const ids = cart.map((item) => +item.id);
  let products = data.filter((item) => ids.includes(item.id));

  products = products.map((item) => {
    item.quantity = existProductOnCart(item.id).quantity;
    return item;
  });

  const total = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return total;
}

function decrementUnit(id) {
  return cart.map((item) => {
    if (item.id === id) {
      item.quantity--;
      return item;
    } else {
      return item;
    }
  });
}

function decrementCart(id) {
  const product = existProductOnCart(id);
  if (!product) return;

  cart = decrementUnit(id);

  if (product && product.quantity <= 1) {
    removeFromCart(id);
    updateButtonContent(id);
    drawCart();
  } else {
    updateQuantity(id);
  }

  saveCartLC();
}
function saveCartLC() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartLC() {
  return JSON.parse(localStorage.getItem("cart"));
}

function getTotalQuantity() {
  let quatityTotal = 0;
  cart.forEach((item) => (quatityTotal += item.quantity));
  return quatityTotal;
}

function updateTotalQuantity() {
  const totalQuatity = document.querySelector(".total-quantity");
  totalQuatity.innerText = getTotalQuantity();
}

function updateButtonContent(id) {
  const button = document.getElementById(`button-content-${id}`);
  button.outerHTML = buttons(id);
}

function updateQuantity(id) {
  const quantity = document.getElementById(`quantity-${id}`);
  if (!quantity) return;
  const product = existProductOnCart(id);
  quantity.innerText = product.quantity;
}

function drawProducts() {
  products.innerHTML = "";
  data.forEach(({ image, name, category, price, id }) => {
    products.innerHTML += productElement(image, name, category, price, id);
  });
}
// END CART FUNCTIONS

function getProductInfo(id) {
  return data.find((product) => product.id === +id);
}

// LOADING DATA
async function getData() {
  try {
    const res = await fetch("./data.json");
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
// END LOADING DATA

window.addEventListener("load", async (event) => {
  cart = loadCartLC() || [];
  data = await getData();
  drawProducts();
  drawCart();
  console.log(getTotal());

  updateTotalQuantity();
});

products.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("button__add") ||
    e.target.classList.contains("increment")
  ) {
    const id = e.target.id.replace("increment-button-", "");
    addToCart(id);
    updateTotalQuantity();
    drawCart();
  }

  if (e.target.classList.contains("decrement")) {
    const id = e.target.id.replace("decrement-button-", "");
    decrementCart(id);
    updateQuantity(id);
    updateTotalQuantity();
  }
});
