import { IProduct } from "../../interface";
import {
  addToCart,
  addToWishlist,
  getFilteredProducts,
} from "../../services/ApiServices";

function createProductElement(product: IProduct) {
  const productItem = document.createElement("div");
  productItem.innerHTML = /* html */ `
  <h3>${product.productName}</h3>
  <img src= "${product.imageUrl}" alt= "..." />
  <p>${product.description}</p>
  <p>Price: ${product.price}</p>
  <button class="add-to-cart-btn">
    Add to Cart
  </button>
  <button class="add-to-wishlist-btn">
    Add to Wishlist
  </button>
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
  const filterFormContainer = document.createElement("div");
  filterFormContainer.innerHTML = /*html*/ `
  <form id="filterForm">
  <label for="category">Category:</label>
  <select id="category" name="category">
    <option value="">All Categories</option>
    <option value="Men Jeans">Men Jeans</option>
    <option value="Men Shirt">Men Shirt</option>
    <option value="Bags">Bags</option>
    <option value="Women Clothes">Women Clothes</option>
  </select>

  <label for="minPrice">Min Price:</label>
  <input type="number" id="minPrice" name="minPrice" placeholder="Min Price">

  <label for="maxPrice">Max Price:</label>
  <input type="number" id="maxPrice" name="maxPrice" placeholder="Max Price">

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
