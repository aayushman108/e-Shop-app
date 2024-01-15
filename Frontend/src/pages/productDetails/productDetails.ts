import { showErrorToast, showSuccessToast } from "../../components/Toasts";
import { IProduct } from "../../interface";
import { navigateToPage } from "../../router";
import { addToCart, addToWishlist } from "../../services/ApiServices";

function renderProduct(product: IProduct) {
  const productContainer = document.createElement("div");
  productContainer.className = "product__container";
  productContainer.innerHTML = /*html*/ `
    <div class="row row-cols-md-2">
          <div class="col-md-6 col-12 text-center product__container-image">
            <img src=${product.imageUrl} alt="...."/>
          </div>
          <div class="col-md-6 col-12 product__container-details">
            <h1>${product.productName}</h1>
            <p>${product.category}</p>
            <div class="row w-100 mx-0">
              <div class="col-6 fs-4 px-0 price">$${product.price}</div>
            </div>
            <div class="row w-100 mx-0 my-4">
              <input type="number" id="quantity" value="1" min="1" class="col-2 text-center" />
              <button class="col-8 col-lg-6 py-2 mx-1 add-to-cart-btn"><i class="bi bi-cart px-3"></i><span>Add to Cart</span></button>
              <button class="my-2 py-2 col-6 mt-4 add-to-wishlist-btn"><i class="bi bi-heart"></i><span class="px-2">Add to Wishlist</span></button>
            </div>
            <div>
              <h4>Description</h4>
              <p>${product.description}</p>
            </div>
          </div>
        </div>
    `;

  const addToCartButton = productContainer.querySelector(
    ".add-to-cart-btn"
  ) as HTMLButtonElement;
  const addToWishlistButton = productContainer.querySelector(
    ".add-to-wishlist-btn"
  ) as HTMLButtonElement;
  const quantityInput = productContainer.querySelector(
    "#quantity"
  ) as HTMLInputElement;

  addToCartButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      const quantity: number = quantityInput.valueAsNumber;
      if (userId) {
        await addToCart(product.productId, userId, quantity);
        showSuccessToast("Product added to cart successfully");
      } else {
        navigateToPage("login");
      }
    } catch (error) {
      showErrorToast("Error adding product to cart");
    }
  });

  addToWishlistButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await addToWishlist(product.productId, userId);
        showSuccessToast("Product add to wishlist successfully");
      } else {
        navigateToPage("login");
      }
    } catch (error) {
      showErrorToast("Error adding product to wishlist");
    }
  });

  return productContainer;
}

export async function renderSingleProduct() {
  const container = document.createElement("div");
  container.className = "product";

  const currentUrl = new URL(window.location.href);
  const searchParam = currentUrl.searchParams.get("query");

  if (searchParam) {
    try {
      const decodeProduct = JSON.parse(decodeURIComponent(searchParam));
      const product: IProduct = decodeProduct;
      container.appendChild(renderProduct(product));
      return container;
    } catch (error) {
      showErrorToast("Error parsing search results");
      return null;
    }
  }
}
