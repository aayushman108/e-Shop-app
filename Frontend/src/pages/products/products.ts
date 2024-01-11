import { IProduct } from "../../interface";
import { getProducts } from "../../services/ApiServices";
import { renderProduct } from "../../utils";

export async function renderProducts() {
  const container = document.createElement("div");
  const products: IProduct[] = await getProducts();
  products.map((product) => {
    container.appendChild(renderProduct(product));
  });
  console.log(container);
  return container;
}
