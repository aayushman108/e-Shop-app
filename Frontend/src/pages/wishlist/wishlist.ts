export async function renderWishlist(): Promise<string> {
  try {
    const response = await fetch("./src/pages/wishlist/index.html");
    const wishlistTemplate = await response.text();
    console.log(wishlistTemplate);
    return wishlistTemplate;
  } catch (error) {
    console.error("Error rendering home page:", error);
    return "";
  }
}
