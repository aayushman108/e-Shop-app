import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../components/Toasts";
import { IProduct, IProductPageDetails } from "../../interface";
import { navigateToPage } from "../../router";
import {
  addToCart,
  addToWishlist,
  getFilteredProducts,
  getSingleProduct,
} from "../../services/ApiServices";
import { PAGE_SIZE } from "../../constant";

function createProductElement(product: IProduct) {
  const productItem = document.createElement("div");
  productItem.className = "products-list__item";
  productItem.innerHTML = /* html */ `
  <div class="products-list__item-image">
    <img src= "${product.imageUrl}" alt= "..." />
  </div>
  <div class="products-list__item-description">
    <p>${product.productName}</p>
    <p>$${product.price}</p>
  </div>
  <div class="products-list__item-links">
    <button class="add-to-cart-btn">
      <i class="bi bi-cart4"></i>
    </button>
    <button class="add-to-wishlist-btn">
      <i class="bi bi-bag-heart"></i>
    </button>
    <button class="go-to-product-details-btn">
      <i class="bi bi-eye"></i>
    </button>
  </div>
`;
  const addToCartButton = productItem.querySelector(
    ".add-to-cart-btn"
  ) as HTMLButtonElement;
  const addToWishlistButton = productItem.querySelector(
    ".add-to-wishlist-btn"
  ) as HTMLButtonElement;
  const goToProductDetailsButton = productItem.querySelector(
    ".go-to-product-details-btn"
  ) as HTMLButtonElement;
  const goToProductDetailsImg = productItem.querySelector(
    ".products-list__item-image"
  ) as HTMLDivElement;

  addToCartButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await addToCart(product.productId, userId);
        showSuccessToast("Product added to cart successfully!");
      } else {
        showErrorToast("User ID not found.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast("Product already in cart");
      }
    }
  });

  addToWishlistButton.addEventListener("click", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await addToWishlist(product.productId, userId);
        showSuccessToast("Product added to wishlist successfully!");
      } else {
        showErrorToast("User ID not found.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast("Product already in wishlist");
      }
    }
  });

  goToProductDetailsButton.addEventListener("click", async () => {
    try {
      const productId = product.productId;
      const productDetails = await getSingleProduct(productId);
      const encodedProduct = encodeURIComponent(JSON.stringify(productDetails));
      navigateToPage("singleProduct", encodedProduct);
    } catch (error) {
      showErrorToast("Error fetching product details");
    }
  });

  goToProductDetailsImg.addEventListener("click", async () => {
    try {
      const productId = product.productId;
      const productDetails = await getSingleProduct(productId);
      const encodedProduct = encodeURIComponent(JSON.stringify(productDetails));
      navigateToPage("singleProduct", encodedProduct);
    } catch (error) {
      showErrorToast("Error fetching product details");
    }
  });

  return productItem;
}

async function fetchAndRenderFilteredProducts(
  filters: Record<string, string>,
  page: number,
  pageSize: number,
  productsContainer: HTMLDivElement
) {
  try {
    const productsPageProducts: IProductPageDetails = await getFilteredProducts(
      filters,
      page,
      pageSize
    );
    const pageNumber: number = productsPageProducts.page;
    const totalPages: number = productsPageProducts.totalPages;
    const totalProducts: number = productsPageProducts.totalProducts;
    const products: IProduct[] = productsPageProducts.products;
    const productsList = document.createElement("div");
    productsList.className = "products-list";

    products.forEach((product) => {
      productsList.appendChild(createProductElement(product));
    });

    productsContainer.innerHTML = "";
    productsContainer.appendChild(productsList);
    renderPaginationControls(page, totalPages, filters, productsContainer);
    return { pageNumber, pageSize, totalPages, totalProducts };
  } catch (error) {
    showErrorToast("Error fetching or rendering filtered products");
  }
}

function renderPaginationControls(
  currentPage: number,
  totalPages: number,
  filters: Record<string, string>,
  productsContainer: HTMLDivElement
) {
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination-container";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i.toString();
    pageButton.className = "page__button";
    pageButton.addEventListener("click", async () => {
      try {
        await fetchAndRenderFilteredProducts(
          filters,
          i,
          PAGE_SIZE,
          productsContainer
        );
      } catch (error) {
        showErrorToast("Error fetching products for page " + i);
      }
    });

    pageButton.classList.remove("page__button--active");

    if (i === currentPage) {
      pageButton.classList.add("page__button--active");
    }

    paginationContainer.appendChild(pageButton);
  }

  productsContainer.appendChild(paginationContainer);
}

export async function renderProducts() {
  const container = document.createElement("div");
  container.className = "products";
  const filterFormContainer = document.createElement("div");
  filterFormContainer.className = "products__filter";
  filterFormContainer.innerHTML = /*html*/ `
  <form id="filterForm">
      <select id="category" name="category">
        <option value="">All Categories</option>
        <option value="Men Jeans">Men Jeans</option>
        <option value="Men Shirt">Men Shirt</option>
        <option value="Bags">Bags</option>
        <option value="Women Clothes">Women Clothes</option>
      </select>

      <input
        type="number"
        id="minPrice"
        name="minPrice"
        placeholder="Min Price"
      />

      <input
        type="number"
        id="maxPrice"
        name="maxPrice"
        placeholder="Max Price"
      />

      <button type="button" class="apply-filter">Apply Filters</button>
      <button type="button" class="reset-filter">Reset Filters</button>
    </form>
  `;

  const applyFiltersButton = filterFormContainer.querySelector(
    ".apply-filter"
  ) as HTMLButtonElement;
  const resetFiltersButton = filterFormContainer.querySelector(
    ".reset-filter"
  ) as HTMLButtonElement;

  const productsContainer = document.createElement("div");
  productsContainer.className = "products__container";

  const filterForm = filterFormContainer.querySelector(
    "#filterForm"
  ) as HTMLFormElement;

  applyFiltersButton.addEventListener("click", async () => {
    try {
      const formData = new FormData(filterForm);
      const filters: Record<string, string> = {};

      formData.forEach((value, key) => {
        filters[key] =
          value === null || value === undefined ? "" : String(value);
      });

      await fetchAndRenderFilteredProducts(
        filters,
        1,
        PAGE_SIZE,
        productsContainer
      );
    } catch (error) {
      showErrorToast("Error applying filters");
    }
  });

  resetFiltersButton.addEventListener("click", async () => {
    try {
      await fetchAndRenderFilteredProducts({}, 1, PAGE_SIZE, productsContainer);
    } catch (error) {
      showErrorToast("Error resetting filters");
    }
  });

  // Initial render with default filters
  const pageDetails = await fetchAndRenderFilteredProducts(
    {},
    1,
    PAGE_SIZE,
    productsContainer
  );
  console.log(pageDetails);

  container.appendChild(filterFormContainer);
  container.appendChild(productsContainer);

  return container;
}
