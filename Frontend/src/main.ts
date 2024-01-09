// main.ts
import UniversalRouter, { RouteContext, RouteResult } from "universal-router";

const routes = [
  {
    path: "/",
    action: async () => {
      const response = await fetch("./src/components/home.html");
      return response.text();
    },
  },
  {
    path: "/products",
    children: [
      {
        path: "",
        action: async () => {
          const response = await fetch("./src/components/products.html");
          return response.text();
        },
      },
      {
        path: "/:id",
        action: async (context: RouteContext) => {
          const response = await fetch("./src/components/singleProduct.html");
          return response.text();
        },
      },
    ],
  },
  {
    path: "/cart",
    action: async () => {
      const response = await fetch("./src/components/cart.html");
      return response.text();
    },
  },
  {
    path: "/wishlist",
    action: async () => {
      const response = await fetch("./src/components/wishlist.html");
      return response.text();
    },
  },
  // Adding a catch-all route for Page Not Found
  {
    path: ".*",
    action: () => `<h1>404 - Page Not Found</h1>`,
  },
];

const router = new UniversalRouter(routes);

function renderContent(html: RouteResult<string> | undefined) {
  if (html !== undefined) {
    if (typeof html === "string" || html === null) {
      document.getElementById("app")!.innerHTML = html || "";
    } else if (html instanceof Promise) {
      html.then((resolvedHtml) => {
        document.getElementById("app")!.innerHTML = resolvedHtml || "";
      });
    }
  }
}

function navigate(path: string) {
  router.resolve(path).then((html) => {
    renderContent(html);
    // Update the browser history without a full page reload
    window.history.pushState({}, "", path);
  });

  // Prevent the default behavior of the anchor tag
  return false;
}

// Handle initial route on page load
document.addEventListener("DOMContentLoaded", () => {
  navigate(window.location.pathname);
});

// Handle route changes on navigation
document.addEventListener("click", (event) => {
  const target = event.target as HTMLAnchorElement;
  console.log(target);
  if (target.tagName === "A" && target.getAttribute("href")) {
    const path = target.getAttribute("href")!;
    navigate(path);
    event.preventDefault(); // Prevent the default behavior of the anchor tag
  }
});

// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});
