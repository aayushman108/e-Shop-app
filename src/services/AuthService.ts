import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serverConfig } from "../config/config";

const generateTokens = (user: User) => {
  const accessToken = jwt.sign(
    { id: user.userId },
    serverConfig.jwt.accessTokenSecret,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { id: user.userId },
    serverConfig.jwt.refreshTokenSecret,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

const AuthService = {
  signup: async (username: string, email: string, password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate token pair (access token and refresh token)
    const tokenPair = generateTokens(user);

    // Return the user and tokens
    return { user, ...tokenPair };
  },

  login: async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate token pair (access token and refresh token)
    const tokenPair = generateTokens(user);

    // Return the user and tokens
    return { user, ...tokenPair };
  },
};

export default AuthService;
