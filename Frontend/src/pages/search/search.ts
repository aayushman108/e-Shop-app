import { IProduct } from "../../interface";
import { addToCart, addToWishlist } from "../../services/ApiServices";

function renderProduct(product: IProduct) {
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
export async function renderSearches() {
  const container = document.createElement("div");

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
