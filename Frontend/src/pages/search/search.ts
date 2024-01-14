import { IProduct } from "../../interface";
import { addToCart, addToWishlist } from "../../services/ApiServices";

function renderProduct(product: IProduct) {
  const productItem = document.createElement("div");
  productItem.className = "search__item";
  productItem.innerHTML = /* html */ `
  <div class="search__item-image">
    <img src= "${product.imageUrl}" alt= "..." />
  </div>
  <div class="search__item-description">
    <p>${product.productName}</p>
    <p>$${product.price}</p>
  </div>
  <div class="search__item-links">
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
export async function renderSearches() {
  const container = document.createElement("div");
  container.className = "search";

  const currentUrl = new URL(window.location.href);
  const searchParam = currentUrl.searchParams.get("query");

  if (searchParam) {
    try {
      const searchResults = JSON.parse(decodeURIComponent(searchParam));
      console.log(searchResults);
      const products: IProduct[] = searchResults;
      products.forEach((product) => {
        container.appendChild(renderProduct(product));
      });
      return container;
    } catch (error) {
      console.error("Error parsing search results:", error);
      return null;
    }
  }
}
