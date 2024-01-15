import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../components/Toasts";
import { ICartProduct, IProduct } from "../../interface";
import { navigateToPage } from "../../router";
import {
  addToCart,
  getSingleProduct,
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
  const goToProductDetailsImg = wishlistItem.querySelector(
    ".wishlist__item-image"
  ) as HTMLDivElement;
  const deleteButton = wishlistItem.querySelector(
    ".delete-btn"
  ) as HTMLButtonElement;

  addToCartButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await addToCart(product.productId, userId);
        showSuccessToast("Product added to cart successfully");
        await removeFromWishlist(product.productId, userId);
      } else {
        navigateToPage("login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast("Product already in cart");
      }
    }
  });

  deleteButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await removeFromWishlist(product.productId, userId);
        showSuccessToast("Product removed from wishlist");
        navigateToPage("wishlist");
      } else {
        navigateToPage("login");
      }
    } catch (error) {
      showErrorToast("Error removing product from wishlist");
    }
  });

  goToProductDetailsImg.addEventListener("click", async () => {
    try {
      const productId = product.productId;
      const productDetails = await getSingleProduct(productId);
      const encodedProduct = encodeURIComponent(JSON.stringify(productDetails));
      navigateToPage("singleProduct", encodedProduct);
    } catch (error) {
      showErrorToast("Error fetching product details");
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
