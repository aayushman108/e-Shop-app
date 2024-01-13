import { IProduct } from "../../interface";
import {
  addToCart,
  getCartProducts,
  getProducts,
} from "../../services/ApiServices";

function renderProduct(product: IProduct) {
  const productItem = document.createElement("div");
  productItem.innerHTML = /* html */ `
  <h3>${product.productName}</h3>
  <img src= "${product.imageUrl}" alt= "..." />
  <p>${product.description}</p>
  <p>Price: ${product.price}</p>
  <button class="add-to-cart-btn">
    Add to Cart
  </button>
  <button class="add-to-wishlist-btn">
    Add to Wishlist
  </button>
`;
  const addToCartButton = productItem.querySelector(
    ".add-to-cart-btn"
  ) as HTMLButtonElement;
  const addToWishlistButton = productItem.querySelector(
    ".add-to-wishlist-btn"
  ) as HTMLButtonElement;
  console.log(addToCartButton);

  addToCartButton.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");
    console.log(product.productId);
    if (userId) {
      await addToCart(product.productId, userId);
      await getCartProducts(userId);
    } else {
      return;
    }
  });
  addToWishlistButton?.addEventListener("click", () =>
    //addToWishlist(product.productId)
    console.log("wishlist operation")
  );

  return productItem;
}
export async function renderProducts() {
  const container = document.createElement("div");
  const productsPageDetails = await getProducts();
  const products: IProduct[] = productsPageDetails.products;
  products.forEach((product) => {
    container.appendChild(renderProduct(product));
  });
  return container;
}
