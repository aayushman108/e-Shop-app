import { renderHeader } from "./components/Header";
import { renderHome } from "./pages/home/Home";
import { renderCart } from "./pages/cart/Cart";
import { renderWishlist } from "./pages/wishlist/Wishlist";
import { renderProducts } from "./pages/products/Products";
import { renderSignup } from "./pages/signup/Signup";
import { renderLogin } from "./pages/login/Login";
import { renderSearches } from "./pages/search/search";
import { renderSingleProduct } from "./pages/productDetails/ProductDetails";
import { showErrorToast } from "./components/Toasts";
import { renderCheckout } from "./pages/checkout/Checkout";

/**
 * Initializes the application by rendering the header and navigating to the home page.
 */
export function initializeApp() {
  renderHeader();
  navigateToPage("home");
}

/**
 * Clears the content of the app container.
 */
function clearContent() {
  const contentContainer = document.getElementById("app");
  if (contentContainer) {
    contentContainer.innerHTML = "";
  }
}

/**
 * Renders the provided content to the application container.
 * @param content - The content to be rendered.
 */
function renderContent(content: any) {
  const contentContainer = document.getElementById("app");
  if (!contentContainer) return;
  console.log(typeof content);
  if (typeof content === "string") {
    contentContainer.innerHTML = content;
  } else if (typeof content === "object") {
    contentContainer.appendChild(content);
  }
}

/**
 * Updates the URL based on the current page.
 * @param page - The current page.
 */
function updateUrl(page: string) {
  const url = `/${page}`;

  if (history.pushState) {
    history.pushState({ page }, "", url);
  } else {
    window.location.href = url;
  }
}

/**
 * Navigates to the specified page and renders its content.
 * @param page - The page to navigate to.
 * @param data - Additional data needed for rendering the page.
 */
export async function navigateToPage(page: string, data?: any) {
  clearContent();

  switch (page) {
    case "home":
      handleNavStyle(page);
      history.pushState({ page }, "", "/");
      try {
        const content = await renderHome();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering home page: ${error}`);
      }
      break;
    case "cart":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderCart();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering cart page: ${error}`);
      }
      break;
    case "wishlist":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderWishlist();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering wishlist page: ${error}`);
      }
      break;
    case "checkout":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderCheckout();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering checkout page: ${error}`);
      }
      break;
    case "products":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderProducts();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering products page: ${error}`);
      }
      break;
    case "singleProduct":
      const productUrl = `/product?query=${data}`;
      history.pushState({ path: productUrl }, "", productUrl);
      try {
        const content = await renderSingleProduct();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering product details page: ${error}`);
      }
      break;
    case "signup":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderSignup();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering Signup page: ${error}`);
      }
      break;
    case "login":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderLogin();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering Login page: ${error}`);
      }
      break;
    case "search":
      const url = `/search?query=${data}`;
      history.pushState({ path: url }, "", url);
      try {
        const content = await renderSearches();
        renderContent(content);
      } catch (error) {
        showErrorToast(`Error rendering search page: ${error}`);
      }
      break;
    default:
      showErrorToast(`404 error`);
  }
}

/**
 * Handles the navigation styling by updating the active link.
 * @param value - The value of the active link.
 */
function handleNavStyle(value: string) {
  const links = document.querySelectorAll(
    ".nav-link"
  ) as NodeListOf<HTMLAnchorElement>;
  links.forEach((link) => link.classList.remove("nav-link--active"));

  const activeLink = document.getElementById(value) as HTMLElement | null;
  activeLink?.classList.add("nav-link--active");
}
