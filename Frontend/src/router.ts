import { renderHeader } from "./components/Header";
import { renderHome } from "./pages/home/Home";
import { renderCart } from "./pages/cart/Cart";
import { renderWishlist } from "./pages/wishlist/Wishlist";
import { renderProducts } from "./pages/products/Products";
// import { renderSingleProduct } from "./pages/productDetails/ProductDetails";

export function initializeApp() {
  renderHeader();
  navigateToPage("home");
}

function clearContent() {
  const contentContainer = document.getElementById("app");
  if (contentContainer) {
    contentContainer.innerHTML = "";
  }
}

function renderContent(content: string) {
  const contentContainer = document.getElementById("app");
  if (contentContainer) {
    contentContainer.innerHTML = content;
  }
}

function updateUrl(page: string) {
  const url = `/${page}`;
  history.pushState({ page }, "", url);
}

export async function navigateToPage(page: string) {
  clearContent();

  switch (page) {
    case "home":
      history.pushState({ page }, "", "/");
      renderContent(renderHome());
      break;
    case "cart":
      updateUrl(page);
      renderContent(renderCart());
      break;
    case "wishlist":
      updateUrl(page);
      renderContent(renderWishlist());
      break;
    case "products":
      updateUrl(page);
      renderContent(renderProducts());
      break;
    // case "single-product":
    //   renderContent(renderSingleProduct());
    //   break;
    default:
      console.error(`Unknown page: ${page}`);
  }
}
