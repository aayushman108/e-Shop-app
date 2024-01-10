import { navigateToPage } from "../router";

export function renderHeader() {
  // Create header element
  const header = document.createElement("header");

  // Create navigation element
  const nav = document.createElement("nav");

  // Create Home link
  const homeLink = document.createElement("a");
  //homeLink.href = "#";
  homeLink.textContent = "Home";
  homeLink.addEventListener("click", function () {
    navigateToPage("home");
  });

  // Create Cart link
  const cartLink = document.createElement("a");
  //cartLink.href = "#";
  cartLink.textContent = "Cart";
  cartLink.addEventListener("click", function () {
    navigateToPage("cart");
  });

  // Create Wishlist link
  const wishlistLink = document.createElement("a");
  //wishlistLink.href = "#";
  wishlistLink.textContent = "Wishlist";
  wishlistLink.addEventListener("click", function () {
    navigateToPage("wishlist");
  });

  // Create Products link
  const productsLink = document.createElement("a");
  //productsLink.href = "#";
  productsLink.textContent = "Products";
  productsLink.addEventListener("click", function () {
    navigateToPage("products");
  });

  // Append links to the navigation element
  nav.appendChild(homeLink);
  nav.appendChild(cartLink);
  nav.appendChild(wishlistLink);
  nav.appendChild(productsLink);

  // Append navigation element to the header
  header.appendChild(nav);

  // Append header to the document body
  document.body.prepend(header);
}
