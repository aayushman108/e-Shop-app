import { renderHeader } from "./components/Header";
import { renderHome } from "./pages/home/Home";
import { renderCart } from "./pages/cart/Cart";
import { renderWishlist } from "./pages/wishlist/Wishlist";
import { renderProducts } from "./pages/products/Products";
import { renderSignup } from "./pages/signup/Signup";
import { renderLogin } from "./pages/login/Login";
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
  history.pushState({ page }, "", url);
}

export async function navigateToPage(page: string) {
  clearContent();

  switch (page) {
    case "home":
      handleNavStyle(page);
      history.pushState({ page }, "", "/");
      try {
        const content = await renderHome();
        renderContent(content);
      } catch (error) {
        console.error(`Error rendering home page: ${error}`);
      }
      break;
    case "cart":
      handleNavStyle(page);
      updateUrl(page);
      renderContent(renderCart());
      break;
    case "wishlist":
      handleNavStyle(page);
      updateUrl(page);
      renderContent(renderWishlist());
      break;
    case "products":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderProducts();
        console.log(content);
        renderContent(content);
      } catch (error) {
        console.error(`Error rendering home page: ${error}`);
      }
      // renderContent(renderProducts());
      break;
    case "signup":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderSignup();
        console.log(content);
        renderContent(content);
      } catch (error) {
        console.error(`Error rendering Signup page: ${error}`);
      }
      // renderContent(renderProducts());
      break;
    case "login":
      handleNavStyle(page);
      updateUrl(page);
      try {
        const content = await renderLogin();
        console.log(content);
        renderContent(content);
      } catch (error) {
        console.error(`Error rendering Login page: ${error}`);
      }
      break;
    default:
      console.error(`404 error`);
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
