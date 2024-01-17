import { http } from "./HttpService";
import { ILogin, ISignup } from "../interface";

/**
 * Signs up a new user.
 * @param formData - The user's signup data.
 * @returns - A Promise that resolves with the signup response.
 * @throws - Throws an error if there is an issue with the signup process.
 */
export async function signup(formData: ISignup) {
  try {
    const response = await http.post("/api/users/signup", formData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

/**
 * Logs in a user.
 * @param formData - The user's login data.
 * @returns - A Promise that resolves with the login response.
 * @throws - Throws an error if there is an issue with the login process.
 */
export async function login(formData: ILogin) {
  try {
    const response = await http.post("/api/users/login", formData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * Logs out a user.
 * @param refreshToken - The user's refresh token.
 * @returns - A Promise that resolves with the logout response.
 * @throws - Throws an error if there is an issue with the logout process.
 */
export async function logout(refreshToken: string) {
  try {
    const response = await http.post("/api/users/logout", { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

/**
 * Fetches products based on filters, page, and page size.
 * @param filters - Filters for product retrieval.
 * @param page - The page number.
 * @param pageSize - The number of products per page.
 * @returns - A Promise that resolves with the filtered products.
 * @throws - Throws an error if there is an issue with fetching products.
 */
export async function getFilteredProducts(
  filters: Record<string, string>,
  page: number,
  pageSize: number
) {
  try {
    const queryParams = new URLSearchParams({
      ...filters,
      page: String(page),
      pageSize: String(pageSize),
    });

    const response = await http.get(
      `/api/products?${new URLSearchParams(queryParams)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Adds a product to the user's cart.
 * @param productId - The ID of the product to add to the cart.
 * @param userId - The ID of the user.
 * @param quantity - Optional quantity of the product to add.
 * @returns - A Promise that resolves with the cart update response.
 * @throws - Throws an error if there is an issue with adding the product to the cart.
 */
export async function addToCart(
  productId: string,
  userId: string,
  quantity?: number
) {
  try {
    const response = await http.post(`/api/cart/${userId}/${productId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
}

/**
 * Fetches the products in the user's cart.
 * @param userId - The ID of the user.
 * @returns - A Promise that resolves with the cart products.
 * @throws - Throws an error if there is an issue with fetching the cart products.
 */
export async function getCartProducts(userId: string) {
  try {
    const response = await http.get(`/api/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart products:", error);
    throw error;
  }
}

/**
 * Removes a product from the user's cart.
 * @param productId - The ID of the product to remove from the cart.
 * @param userId - The ID of the user.
 * @returns - A Promise that resolves with the cart update response.
 * @throws - Throws an error if there is an issue with removing the product from the cart.
 */
export async function removeFromCart(productId: string, userId: string) {
  try {
    const response = await http.delete(`/api/cart/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
}

/**
 * Updates the quantity of a product in the user's cart.
 * @param productId - The ID of the product in the cart to update.
 * @param userId - The ID of the user.
 * @param quantity - The new quantity of the product.
 * @returns - A Promise that resolves with the cart update response.
 * @throws - Throws an error if there is an issue with updating the cart product.
 */
export async function updateCartProduct(
  productId: string,
  userId: string,
  quantity: number
) {
  try {
    const response = await http.put(`/api/cart/${userId}/${productId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product from cart:", error);
    throw error;
  }
}

/**
 * Adds a product to the user's wishlist.
 * @param productId - The ID of the product to add to the wishlist.
 * @param userId - The ID of the user.
 * @returns - A Promise that resolves with the wishlist update response.
 * @throws - Throws an error if there is an issue with adding the product to the wishlist.
 */
export async function addToWishlist(productId: string, userId: string) {
  try {
    const response = await http.post(`/api/wishlist/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    throw error;
  }
}

/**
 * Fetches the products in the user's wishlist.
 * @param userId - The ID of the user.
 * @returns - A Promise that resolves with the wishlist products.
 * @throws - Throws an error if there is an issue with fetching the wishlist products.
 */
export async function getWishlistProducts(userId: string) {
  try {
    const response = await http.get(`/api/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    throw error;
  }
}

/**
 * Removes a product from the user's wishlist.
 * @param productId - The ID of the product to remove from the wishlist.
 * @param userId - The ID of the user.
 * @returns - A Promise that resolves with the wishlist update response.
 * @throws - Throws an error if there is an issue with removing the product from the wishlist.
 */
export async function removeFromWishlist(productId: string, userId: string) {
  try {
    const response = await http.delete(`/api/wishlist/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    throw error;
  }
}

/**
 * Fetches the search result for a given query.
 * @param query - The search query.
 * @returns - A Promise that resolves with the search result.
 * @throws - Throws an error if there is an issue with fetching the search result.
 */
export async function getSearchResult(query: string) {
  try {
    const response = await http.get(`/api/products/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching search products:", error);
    throw error;
  }
}

/**
 * Fetches details for a single product.
 * @param productId - The ID of the product.
 * @returns - A Promise that resolves with the product details.
 * @throws - Throws an error if there is an issue with fetching the single product.
 */
export async function getSingleProduct(productId: string) {
  try {
    const response = await http.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single product:", error);
    throw error;
  }
}
