let data = [];
let cart = [];

const noProducts = `
<div class="cart-empty-product">
          <figure>
            <img src="./assets/images/illustration-empty-cart.svg" alt="" />
            <figcaption>
              <small>your added items will appear here</small>
            </figcaption>
          </figure></div>`;

function drawCart() {
  const cartSection = document.querySelector(".cart");
  cartSection.innerHTML = "";
  console.log(cart)
  if (cart.length === 0) {
    cartSection.innerHTML = noProducts;
  }
}

function drawProducts() {
  const products = document.querySelector(".products");
  products.innerHTML = "";
  data.forEach(({ image, name, category, price }) => {
    products.innerHTML += `<div class="card">
          <div class="card__header">
            <picture>
              <source srcset="${image.desktop}" media="(min-width: 769px)">
              <source srcset="${image.tablet}"
                media="(max-width: 768px) and (min-width: 376px)">
              <img src="${
                image.mobile
              }" alt="product image" class="card__image" />
            </picture>
            <div class="card__button">
              <button>
                <img src="./assets/images/icon-add-to-cart.svg" alt="cart icon" />
                <p class="card__text">Add to cart</p>
              </button>
            </div>
          </div>
          <div class="card__body">
            <p><small class="card__category">${category}</small></p>
            <h5 class="card__name">${name}</h6>
          </div>
          <div class="card__footer">
            <h5 class="card__price"><b>$${parseFloat(price).toFixed(2)}</b></h5>
          </div>
        </div>`;
  });
}

async function getData() {
  try {
    const res = await fetch("./data.json");
    data = await res.json();
    console.log(data);
    drawProducts();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  getData();
  // drawCart();
});


