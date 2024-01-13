import { ICartProduct, IProduct } from "../../interface";
import { navigateToPage } from "../../router";
import {
  addToCart,
  getWishlistProducts,
  removeFromWishlist,
} from "../../services/ApiServices";

function renderWishlistProduct(product: IProduct) {
  const wishlistItem = document.createElement("div");
  wishlistItem.innerHTML = /* html */ `
  <h3>${product.productName}</h3>
  <img src= "${product.imageUrl}" alt= "..." />
  <p>Price: ${product.price}</p>
  <button class="add-to-cart-btn">
    Add to Cart
  </button>
  <button class="delete-btn">Delete</button>
`;

  const addToCartButton = wishlistItem.querySelector(
    ".add-to-cart-btn"
  ) as HTMLButtonElement;
  const deleteButton = wishlistItem.querySelector(
    ".delete-btn"
  ) as HTMLButtonElement;

  addToCartButton.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");
    console.log(product.productId);
    if (userId) {
      await addToCart(product.productId, userId);
      await removeFromWishlist(product.productId, userId);
    } else {
      return;
    }
  });
  deleteButton.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");
    console.log(product.productId);
    if (userId) {
      await removeFromWishlist(product.productId, userId);
      navigateToPage("wishlist");
    } else {
      return;
    }
  });

  return wishlistItem;
}
export async function renderWishlist() {
  const container = document.createElement("div");

  const userId = localStorage.getItem("userId");

  let wishlistPageDetails: ICartProduct[] = [];
  if (userId) {
    wishlistPageDetails = await getWishlistProducts(userId);
  }

  wishlistPageDetails.forEach((wishlist) => {
    const { Product } = wishlist;
    container.appendChild(renderWishlistProduct(Product));
    console.log(wishlist);
  });

  return container;
}
