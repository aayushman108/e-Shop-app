import { IProduct } from "./interface";

export function renderProduct(product: IProduct) {
  const productItem = document.createElement("div");
  productItem.classList.add("product-item");

  const titleElement = document.createElement("h3");
  titleElement.textContent = product.title;
  titleElement.classList.add("product-title");

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = product.description;
  descriptionElement.classList.add("product-description");

  const priceElement = document.createElement("p");
  priceElement.textContent = `Price: ${product.price}`;
  priceElement.classList.add("product-price");

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.classList.add("add-to-cart-button");
  addToCartButton.addEventListener("click", () => addToCart(product.id));

  const addToWishlistButton = document.createElement("button");
  addToWishlistButton.textContent = "Add to Wishlist";
  addToWishlistButton.classList.add("add-to-wishlist-button");
  addToWishlistButton.addEventListener("click", () =>
    addToWishlist(product.id)
  );

  productItem.appendChild(titleElement);
  productItem.appendChild(descriptionElement);
  productItem.appendChild(priceElement);
  productItem.appendChild(addToCartButton);
  productItem.appendChild(addToWishlistButton);

  return productItem;
}

function addToCart(productId: number) {
  console.log(`Product added to cart: ${productId}`);
}

function addToWishlist(productId: number) {
  console.log(`Product added to wishlist: ${productId}`);
}
