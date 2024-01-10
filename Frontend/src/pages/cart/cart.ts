export async function renderCart(): Promise<string> {
  try {
    const response = await fetch("./src/pages/cart/index.html");
    const cartTemplate = await response.text();
    console.log(cartTemplate);
    return cartTemplate;
  } catch (error) {
    console.error("Error rendering home page:", error);
    return "";
  }
}
