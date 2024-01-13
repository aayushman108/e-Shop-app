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
