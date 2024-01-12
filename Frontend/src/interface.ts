export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
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
