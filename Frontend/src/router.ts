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
  console.log(contentContainer);
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
      try {
        updateUrl(page);
        const content = await renderHome();
        renderContent(content);
      } catch (error) {
        console.error(`Error rendering home page: ${error}`);
      }
      break;
    case "cart":
      try {
        updateUrl(page);
        const content = await renderCart();
        renderContent(content);
      } catch (error) {
        console.error(`Error rendering cart page: ${error}`);
      }
      break;
    case "wishlist":
      try {
        updateUrl(page);
        const content = await renderWishlist();
        renderContent(content);
      } catch (error) {
        console.error(`Error rendering wishlist page: ${error}`);
      }
      break;
    case "products":
      try {
        updateUrl(page);
        const content = await renderProducts();
        renderContent(content);
      } catch (error) {
        console.error(`Error rendering products page: ${error}`);
      }
      break;
    // case "single-product":
    //   renderContent(renderSingleProduct());
    //   break;
    default:
      console.error(`Unknown page: ${page}`);
  }
}
