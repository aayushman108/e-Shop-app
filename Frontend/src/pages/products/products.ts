import { IProduct } from "../../interface";
import {
  addToCart,
  addToWishlist,
  getFilteredProducts,
} from "../../services/ApiServices";

function createProductElement(product: IProduct) {
  const productItem = document.createElement("div");
  productItem.className = "products-list__item";
  productItem.innerHTML = /* html */ `
  <div class="products-list__item-image">
    <img src= "${product.imageUrl}" alt= "..." />
  </div>
  <div class="products-list__item-description">
    <p>${product.productName}</p>
    <p>$${product.price}</p>
  </div>
  <div class="products-list__item-links">
    <button class="add-to-cart-btn">
      <i class="bi bi-cart4"></i>
    </button>
    <button class="add-to-wishlist-btn">
      <i class="bi bi-bag-heart"></i>
    </button>
    <button class="see-product-detail">
      <i class="bi bi-eye"></i>
    </button>
  </div>
`;
  const addToCartButton = productItem.querySelector(
    ".add-to-cart-btn"
  ) as HTMLButtonElement;
  const addToWishlistButton = productItem.querySelector(
    ".add-to-wishlist-btn"
  ) as HTMLButtonElement;
  console.log(addToCartButton);

  addToCartButton.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");
    console.log(product.productId);
    if (userId) {
      await addToCart(product.productId, userId);
    } else {
      return;
    }
  });
  addToWishlistButton.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");
    console.log(product.productId);
    if (userId) {
      await addToWishlist(product.productId, userId);
    } else {
      return;
    }
  });

  return productItem;
}

async function fetchAndRenderFilteredProducts(
  filters: Record<string, string>,
  productsContainer: HTMLDivElement
) {
  try {
    const productsPageProducts = await getFilteredProducts(filters);
    const products: IProduct[] = productsPageProducts.products;
    const productsList = document.createElement("div");
    productsList.className = "products-list";

    products.forEach((product) => {
      productsList.appendChild(createProductElement(product));
    });

    productsContainer.innerHTML = "";
    productsContainer.appendChild(productsList);
  } catch (error) {
    console.error("Error fetching or rendering filtered products:", error);
  }
}

export async function renderProducts() {
  const container = document.createElement("div");
  container.className = "products";
  const filterFormContainer = document.createElement("div");
  filterFormContainer.className = "products__filter";
  filterFormContainer.innerHTML = /*html*/ `
  <form id="filterForm">
      <select id="category" name="category">
        <option value="">All Categories</option>
        <option value="Men Jeans">Men Jeans</option>
        <option value="Men Shirt">Men Shirt</option>
        <option value="Bags">Bags</option>
        <option value="Women Clothes">Women Clothes</option>
      </select>

      <input
        type="number"
        id="minPrice"
        name="minPrice"
        placeholder="Min Price"
      />

      <input
        type="number"
        id="maxPrice"
        name="maxPrice"
        placeholder="Max Price"
      />

      <button type="button" class="apply-filter">Apply Filters</button>
      <button type="button" class="reset-filter">Reset Filters</button>
    </form>
  `;

  const applyFiltersButton = filterFormContainer.querySelector(
    ".apply-filter"
  ) as HTMLButtonElement;
  const resetFiltersButton = filterFormContainer.querySelector(
    ".reset-filter"
  ) as HTMLButtonElement;

  const productsContainer = document.createElement("div");
  productsContainer.className = "products__container";

  const filterForm = filterFormContainer.querySelector(
    "#filterForm"
  ) as HTMLFormElement;

  applyFiltersButton.addEventListener("click", async () => {
    const formData = new FormData(filterForm);
    const filters: Record<string, string> = {};

    formData.forEach((value, key) => {
      filters[key] = value === null || value === undefined ? "" : String(value);
    });

    await fetchAndRenderFilteredProducts(filters, productsContainer);
  });

  resetFiltersButton.addEventListener("click", async () => {
    await fetchAndRenderFilteredProducts({}, productsContainer);
  });

  // Initial render with default filters
  await fetchAndRenderFilteredProducts({}, productsContainer);

  container.appendChild(filterFormContainer);
  container.appendChild(productsContainer);

  return container;
}
