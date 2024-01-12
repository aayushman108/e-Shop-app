import { navigateToPage } from "../router";

export function renderHeader() {
  const header = document.createElement("header");
  header.className = "header";
  header.innerHTML = /* html */ `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand d-lg-none" href="#">e-shop</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="d-flex justify-content-between px-4" style="border: 2px solid black; width: 100%;">
            <a class="navbar-brand d-none d-lg-block" href="#">e-shop</a>
            <ul class="navbar-nav mb-2 mb-lg-0 order-lg-2 order-sm-1">
              <li class="nav-item">
                <a class="nav-link" id="home" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="products" href="#">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="login" href="#">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="signup" href="#">Signup</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="wishlist" href="#">Wishlist</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="cart" href="#">Cart</a>
              </li>
            </ul>
            <form class="order-lg-1 order-sm-2" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  `;

  const links = header.querySelectorAll(
    ".nav-link"
  ) as NodeListOf<HTMLAnchorElement>;
  links.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  document.body.prepend(header);
}

function handleNavLinkClick(event: Event) {
  event.preventDefault();

  const target = event.target as HTMLAnchorElement;
  const pageId = target.id;

  // const links = document.querySelectorAll(
  //   ".nav-link"
  // ) as NodeListOf<HTMLAnchorElement>;
  // links.forEach((link) => link.classList.remove("nav-link--active"));

  // target.classList.add("nav-link--active");

  navigateToPage(pageId);
}
