import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../components/Toasts";
import { IProduct } from "../../interface";
import {
  addToCart,
  addToWishlist,
  getSingleProduct,
} from "../../services/ApiServices";
import { navigateToPage } from "../../router";

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
    <button class="go-to-product-details-btn">
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
  const goToProductDetailsButton = productItem.querySelector(
    ".go-to-product-details-btn"
  ) as HTMLButtonElement;
  const goToProductDetailsImg = productItem.querySelector(
    ".search__item-image"
  ) as HTMLDivElement;

  addToCartButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await addToCart(product.productId, userId);
        showSuccessToast("Product added to cart successfully!");
      } else {
        showErrorToast("User ID not found.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast("Product already in cart");
      }
    }
  });
  addToWishlistButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await addToWishlist(product.productId, userId);
        showSuccessToast("Product added to wishlist successfully!");
      } else {
        showErrorToast("User ID not found.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast("Product already in wishlist");
      }
    }
  });
  goToProductDetailsButton.addEventListener("click", async () => {
    try {
      const productId = product.productId;
      const productDetails = await getSingleProduct(productId);
      const encodedProduct = encodeURIComponent(JSON.stringify(productDetails));
      navigateToPage("singleProduct", encodedProduct);
    } catch (error) {
      showErrorToast("Error fetching product details");
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

  console.log(productItem);
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
