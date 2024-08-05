let data = [];
let cart = [];
const cartSection = document.querySelector(".cart");

const noProducts = `
<div class="cart-empty-product">
          <figure>
            <img src="./assets/images/illustration-empty-cart.svg" alt="" />
            <figcaption>
            <small>your added items will appear here</small>
            </figcaption>
          </figure></div>`;

const productElement = (image, name, category, price, id) => {
  return `<div class="card" id="${id}">
  <div class="card__header">
    <picture>
      <source srcset="${image.desktop}" media="(min-width: 769px)">
      <source srcset=".${image.tablet}.jpg"
        media="(max-width: 768px) and (min-width: 376px)">
      <img src="${image.mobile}" alt="product image" class="card__image" />
    </picture>
    <div class="btn_product card__button">
      <button class="button__add">
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
    <h5 class="card__price"><b>$${price}</b></h5>
  </div>
</div> `;
};

function drawCart() {
  cartSection.innerHTML = "";
  console.log(cart);
  if (cart.length === 0) {
    cartSection.innerHTML = noProducts;
  }
}

function addToCart(id) {
  cart.push(id);
  console.log(id);
  // drawCart();
}
function drawProducts() {
  const products = document.querySelector(".products");
  products.innerHTML = "";
  data.forEach(({ image, name, category, price, id }) => {
    products.innerHTML += productElement(image, name, category, price, id);
  });
}

async function getData() {
  try {
    const res = await fetch("./data.json");
    data = await res.json();
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", async (event) => {
  await getData();
  // drawCart();
  drawProducts();
  const btns_add = document.querySelectorAll(".button__add");
  console.log(typeof btns_add);
  btns_add.addEventListener("click", (e) => {
    console.log(e.target.id);
  });
});

// const btnBuy = document.querySelector("#confirmOrder");
// const mouseMove = btnBuy.addEventListener("mousemove", (e) => {
//   console.log("Hola", e.target.id);
// });

const btnBuy = document.querySelector("#confirmOrder");
const body = document.querySelector("body");

btnBuy.addEventListener("click", (e) => {});
