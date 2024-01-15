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

function updateUrl(page: string) {
  const url = `/${page}`;

  if (history.pushState) {
    history.pushState({ page }, "", url);
  } else {
    window.location.href = url;
  }
}

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

function handleNavStyle(value: string) {
  const links = document.querySelectorAll(
    ".nav-link"
  ) as NodeListOf<HTMLAnchorElement>;
  links.forEach((link) => link.classList.remove("nav-link--active"));

  const activeLink = document.getElementById(value) as HTMLElement | null;
  activeLink?.classList.add("nav-link--active");
}
