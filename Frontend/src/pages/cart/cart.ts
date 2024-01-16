import { showErrorToast, showSuccessToast } from "../../components/Toasts";
import { ICartProduct, IProduct } from "../../interface";
import { navigateToPage } from "../../router";
import {
  getCartProducts,
  getSingleProduct,
  removeFromCart,
  updateCartProduct,
} from "../../services/ApiServices";

function renderCartProduct(product: IProduct, quantity: number) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart__item";
  cartItem.innerHTML = /* html */ `
  <div class= "cart__item-image">
    <img src= "${product.imageUrl}" alt= "..." />
  </div>
  <div class= "cart__item-description">
    <p>${product.productName}</p>
    <p>${quantity}</p>
  </div>
  <div class="cart__item-price">
    <p>$${product.price.toFixed(2)}</p>
    <input type="number" id="quantity" value="${quantity}" min="1">
    <p>$${(product.price * quantity).toFixed(2)} </p>
  </div>
  <button class="update-btn"><i class="bi bi-arrow-clockwise"></i></button>
  <button class="delete-btn"><i class="bi bi-trash3"></i></button>
`;

  const updateButton = cartItem.querySelector(
    ".update-btn"
  ) as HTMLButtonElement;
  const goToProductDetailsImg = cartItem.querySelector(
    ".cart__item-image"
  ) as HTMLDivElement;
  const deleteButton = cartItem.querySelector(
    ".delete-btn"
  ) as HTMLButtonElement;

  updateButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      const newQuantity = parseInt(
        (cartItem.querySelector("#quantity") as HTMLInputElement).value,
        10
      );

      if (!isNaN(newQuantity) && userId) {
        await updateCartProduct(product.productId, userId, newQuantity);
        navigateToPage("cart");
      } else {
        showErrorToast("Invalid quantity or missing userId");
      }
    } catch (error) {
      showErrorToast("Error updating cart product");
    }
  });

  deleteButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await removeFromCart(product.productId, userId);
        showSuccessToast("Product removed from cart");
        navigateToPage("cart");
      } else {
        navigateToPage("login");
      }
    } catch (error) {
      showErrorToast("Error removing from cart");
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

  return cartItem;
}

export async function renderCart() {
  const container = document.createElement("div");
  container.className = "cart";

  const userId = localStorage.getItem("userId");

  let cartPageDetails: ICartProduct[] = [];
  if (userId) {
    cartPageDetails = await getCartProducts(userId);
  }

  cartPageDetails.forEach((cart) => {
    const { Product, quantity } = cart;
    container.appendChild(renderCartProduct(Product, quantity));
  });

  const checkoutButton = document.createElement("button");
  checkoutButton.id = "checkout-btn";
  checkoutButton.textContent = "Proceed to Checkout";
  checkoutButton.addEventListener("click", () => {
    navigateToPage("checkout");
  });

  container.appendChild(checkoutButton);

  return container;
}
