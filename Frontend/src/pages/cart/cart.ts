import { ICartProduct, IProduct } from "../../interface";
import { getCartProducts } from "../../services/ApiServices";

function renderCartProduct(product: IProduct, quantity: number) {
  const cartItem = document.createElement("div");
  cartItem.innerHTML = /* html */ `
  <h3>${product.productName}</h3>
  <img src= "${product.imageUrl}" alt= "..." />
  <p>${product.description}</p>
  <p>Price: ${product.price}</p>
  <p>Price: ${quantity}</p>
  <button class="add-to-cart-btn">
    Add to Cart
  </button>
  <button class="add-to-wishlist-btn">
    Add to Wishlist
  </button>
`;
  const addToCartButton = cartItem.querySelector(
    ".add-to-cart-btn"
  ) as HTMLButtonElement;
  const addToWishlistButton = cartItem.querySelector(
    ".add-to-wishlist-btn"
  ) as HTMLButtonElement;
  console.log(addToCartButton);
  console.log(addToWishlistButton);

  // addToCartButton.addEventListener("click", async () => {
  //   const userId = localStorage.getItem("userId");
  //   console.log(product.productId);
  //   if (userId) {
  //     await addToCart(product.productId, userId);
  //     await getCartProducts(userId);
  //   } else {
  //     return;
  //   }
  // });
  // addToWishlistButton.addEventListener("click", async () => {
  //   const userId = localStorage.getItem("userId");
  //   console.log(product.productId);
  //   if (userId) {
  //     await addToWishlist(product.productId, userId);
  //     await getWishlistProducts(userId);
  //   } else {
  //     return;
  //   }
  // });

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
