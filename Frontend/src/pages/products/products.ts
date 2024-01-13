import { IProduct } from "../../interface";
import { getProducts } from "../../services/ApiServices";
import { addToCart, addToWishlist } from "../../utils";

function renderProduct(product: IProduct) {
  const productItem = document.createElement("div");
  productItem.innerHTML = `
  <h3>${product.title}</h3>
  <p>${product.description}</p>
  <p>Price: ${product.price}</p>
  <button class="add-to-cart-btn">
    Add to Cart
  </button>
  <button class="add-to-wishlist-btn">
    Add to Wishlist
  </button>
`;
  const addToCartButton = productItem.querySelector(".add-to-cart-btn");
  const addToWishlistButton = productItem.querySelector(".add-to-wishlist-btn");

  addToCartButton?.addEventListener("click", () => addToCart(product.id));
  addToWishlistButton?.addEventListener("click", () =>
    addToWishlist(product.id)
  );
  return productItem;
}
export async function renderProducts() {
  const container = document.createElement("div");
  const products: IProduct[] = await getProducts();
  products.forEach((product) => {
    container.appendChild(renderProduct(product));
  });
  return container;
}
