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

/**
 * Renders a single wishlist product HTML element.
 * @param product - The product to be rendered in the wishlist.
 * @returns - The HTML element representing the wishlist product.
 */
function renderWishlistProduct(product: IProduct): HTMLDivElement {
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

/**
 * Renders the entire wishlist page with all wishlist products.
 * @returns - A promise resolving to the HTML element representing the wishlist page.
 */
export async function renderWishlist(): Promise<HTMLDivElement> {
  const container = document.createElement("div");
  container.className = "wishlist";

  const heading = document.createElement("h2");
  heading.textContent = "Wishlist Products";
  container.appendChild(heading);

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
