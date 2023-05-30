// 1. Pintar los productos en el main

const printProducts = (container, productList) => {
  container.innerHTML = '';
  productList.forEach(item => {
    container.innerHTML += `
      <div class="col-3 product-box">
        <img src="${item.image}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <p class="title">${item.name}</p>
          <p class="price">
            <span>${item.discount}</span>
            <span><del>${item.price}</del></span>
          </p>
          <button type="button" class="btn favorites__btn">
            <div>
              <span class="material-icons-outlined">favorite_border</span>
            </div>
          </button>
          <button type="button" class="button-add">
            <span class="material-icons-outlined">add</span>Add
          </button>
        </div>
      </div>
    `
  })
}

const getProducts = async (filter) => {
  // Método GET 
  const response = await fetch(`http://localhost:3000/products?${filter}`);
  const data = await response.json();
  console.log("data products", data);
  printProducts(document.getElementById('products'), data);
}   
getProducts('');


// 2. Búsqueda de producto por nombre

const filterByName = (termSearch = "", productList) => {
  const productsFiltered = productList.filter(product =>
    product.name.toLowerCase().includes(termSearch.toLowerCase())
  );
  const result = productsFiltered.length ? productsFiltered : productList;

  const messageResult = productsFiltered.length ? false : "Este producto no existe.";

  return {
    resultSearch: result,
    messageSearch: messageResult,
  };
};

// 3. Capturamos el input de búsqueda y escuchamos el evento submit 

const formSearch = document.querySelector(".search-bar");

formSearch.addEventListener("submit", event => {
  event.preventDefault();

  const inputSearch = formSearch.children[0];
  const searchTerm = inputSearch.value.trim();

  if (searchTerm) {
    getProducts(`q=${searchTerm}`);
  } else {
    Swal.fire("Oops!", "No has ingresado una palabra para buscar.", "error");
  }
});
