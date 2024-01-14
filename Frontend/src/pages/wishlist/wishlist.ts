import { ICartProduct, IProduct } from "../../interface";
import { navigateToPage } from "../../router";
import {
  addToCart,
  getWishlistProducts,
  removeFromWishlist,
} from "../../services/ApiServices";

function renderWishlistProduct(product: IProduct) {
  const wishlistItem = document.createElement("div");
  wishlistItem.className = "wishlist__item";
  wishlistItem.innerHTML = /* html */ `
  <div class="wishlist__item-image">
    <img src= "${product.imageUrl}" alt= "..." />
  </div>
  <div class="wishlist__item-description">
    <p>${product.productName}</p>
    <p>$${product.price}</p>
  </div>
  <button class="add-to-cart-btn"><i class="bi bi-cart4"></i>&nbsp;&nbsp;Add to Cart</button>
  <button class="delete-btn"><i class="bi bi-trash3"></i></button>
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
  container.className = "wishlist";

  const userId = localStorage.getItem("userId");

  let wishlistPageDetails: ICartProduct[] = [];
  if (userId) {
    wishlistPageDetails = await getWishlistProducts(userId);
  }

  wishlistPageDetails.forEach((wishlist) => {
    const { Product } = wishlist;
    container.appendChild(renderWishlistProduct(Product));
  });

  return container;
}
