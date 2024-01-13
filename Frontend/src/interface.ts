export interface IProduct {
  productName: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  productId: string;
  imageUrl: string;
}

export interface ISignup {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  userId: string;
  username: string;
  email: string;
  address: string | null;
}

export interface ICartProduct {
  Product: IProduct;
  User: IUser;
  cartId: number;
  productId: string;
  quantity: number;
  userId: string;
}
