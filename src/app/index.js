// 1. Búsqueda de oficios o productos de Lab 3.50 por nombre

const filterByName = (termSearch = "", productList) => {
  const productsFiltered = productList.filter(product =>
    product.name.toLowerCase().includes(termSearch.toLowerCase())
  );
  const result = productsFiltered.length ? productsFiltered : productList;

  const messageResult = productsFiltered.length ? false : "Este oficio no existe.";

  return {
    resultSearch: result,
    messageSearch: messageResult,
  };
};

// 2. Capturamos el input de búsqueda y escuchamos el evento submit 

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

// 3. Escuchar el click del logo principal para que devuelva al home

const logo = document.querySelector(".header__figure");

logo.addEventListener("click", () => {
  window.location.href = "../src/index.html";
});