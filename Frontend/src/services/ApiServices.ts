import { http } from "./HttpService";
import { ILogin, ISignup } from "../interface";

export async function signup(formData: ISignup) {
  try {
    const response = await http.post("/api/users/signup", formData);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function login(formData: ILogin) {
  try {
    const response = await http.post("/api/users/login", formData);
    return response.data;
    //console.log(response.data);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const response = await http.get("/api/products/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function addToCart(
  productId: string,
  userId: string,
  quantity?: number
) {
  try {
    const response = await http.post(`/api/cart/${userId}/${productId}`, {
      quantity,
    });
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
}

export async function getCartProducts(userId: string) {
  try {
    const response = await http.get(`/api/cart/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart products:", error);
    throw error;
  }
}

export async function removeFromCart(productId: string, userId: string) {
  try {
    const response = await http.delete(`/api/cart/${userId}/${productId}`);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
}

export async function updateCartProduct(
  productId: string,
  userId: string,
  quantity: number
) {
  try {
    const response = await http.put(`/api/cart/${userId}/${productId}`, {
      quantity,
    });
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error updating product from cart:", error);
    throw error;
  }
}

export async function addToWishlist(productId: string, userId: string) {
  try {
    const response = await http.post(`/api/wishlist/${userId}/${productId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    throw error;
  }
}

export async function getWishlistProducts(userId: string) {
  try {
    const response = await http.get(`/api/wishlist/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    throw error;
  }
}

export async function removeFromWishlist(productId: string, userId: string) {
  try {
    const response = await http.delete(`/api/wishlist/${userId}/${productId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    throw error;
  }
}

export async function getSearchResult(query: string) {
  try {
    const response = await http.get(`/api/products/search?query=${query}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching search products:", error);
    throw error;
  }
}
