import { getProducts } from "../../services/ApiServices";

export async function renderProducts(): Promise<string> {
  try {
    const response = await fetch("./src/pages/products/index.html");
    const productsTemplate = await response.text();
    console.log(window.location.href);
    return productsTemplate;
    const products = await getProducts();
    console.log(products);
  } catch (error) {
    console.error("Error rendering products page:", error);
    return "";
  }
}
