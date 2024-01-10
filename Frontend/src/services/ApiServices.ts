import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get("http://localhost:3000/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function addToCart(productId: number) {
  try {
    const response = await axios.post("http://localhost:3000/api/cart", {
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
}

export async function addToWishlist(productId: number) {
  try {
    const response = await axios.post("http://localhost:3000/api/wishlist", {
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    throw error;
  }
}

export async function getCartProducts() {
  try {
    const response = await axios.get("http://localhost:3000/api/cart");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart products:", error);
    throw error;
  }
}

export async function getWishlistProducts() {
  try {
    const response = await axios.get("http://localhost:3000/api/wishlist");
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    throw error;
  }
}
