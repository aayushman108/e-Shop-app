import { ICartProduct, IProduct } from "../../interface";
import { navigateToPage } from "../../router";
import {
  getCartProducts,
  removeFromCart,
  updateCartProduct,
} from "../../services/ApiServices";

function renderCartProduct(product: IProduct, quantity: number) {
  const cartItem = document.createElement("div");
  cartItem.innerHTML = /* html */ `
  <h3>${product.productName}</h3>
  <img src= "${product.imageUrl}" alt= "..." />
  <p>Price: ${product.price}</p>
  <p>Quantity: ${quantity}</p>
  <p>Total price: ${product.price * quantity} </p>
  <label for="quantity">Quantity:</label>
  <input type="number" id="quantity" value="${quantity}" min="1">
  <button class="update-btn">Update</button>
  <button class="delete-btn">Delete</button>
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
