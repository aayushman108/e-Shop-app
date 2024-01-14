import { ICartProduct, IProduct } from "../../interface";
import { navigateToPage } from "../../router";
import {
  getCartProducts,
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
    <p>$${product.price}</p>
    <input type="number" id="quantity" value="${quantity}" min="1">
    <p>$${product.price * quantity} </p>
  </div>
  <button class="update-btn"><i class="bi bi-arrow-clockwise"></i></button>
  <button class="delete-btn"><i class="bi bi-trash3"></i></button>
`;

  const updateButton = cartItem.querySelector(
    ".update-btn"
  ) as HTMLButtonElement;
  const deleteButton = cartItem.querySelector(
    ".delete-btn"
  ) as HTMLButtonElement;

  updateButton.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");
    const newQuantity = parseInt(
      (cartItem.querySelector("#quantity") as HTMLInputElement).value,
      10
    );

    if (!isNaN(newQuantity) && userId) {
      await updateCartProduct(product.productId, userId, newQuantity);
      // Refresh the cart page
      navigateToPage("cart");
    } else {
      // Handle invalid input or missing userId
      console.error("Invalid quantity or missing userId");
    }
  });

  deleteButton.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");
    console.log(product.productId);
    if (userId) {
      await removeFromCart(product.productId, userId);
      navigateToPage("cart");
    } else {
      return;
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
    console.log(cart);
  });

  return container;
}
