let data = [];

async function getData() {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  getData();
});

function drawProducts() {
  const products = document.querySelector(".products");

  data.forEach((product) => {

    


  });
}
