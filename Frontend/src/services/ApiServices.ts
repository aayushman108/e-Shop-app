import axios from "axios";
import { http } from "./HttpService";
import { ILogin, ISignup } from "../interface";

export async function signup(formData: ISignup) {
  try {
    const response = await http.post("/api/users/signup", formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function login(formData: ILogin) {
  try {
    const response = await http.post("/api/users/login", formData);
    //return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    // const response = await axios.get("/api/products");
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function addToCart(productId: number) {
  try {
    const response = await http.post("/api/cart", {
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
    const response = await http.post("/api/wishlist", {
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
    const response = await http.get("/api/cart");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart products:", error);
    throw error;
  }
}

export async function getWishlistProducts() {
  try {
    const response = await http.get("/api/wishlist");
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    throw error;
  }
}
