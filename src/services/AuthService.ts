import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serverConfig } from "../config/config";

const { accessTokenSecret, refreshTokenSecret } = serverConfig.jwt;

const generateTokens = (user: User) => {
  const accessToken = jwt.sign({ id: user.userId }, accessTokenSecret, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ id: user.userId }, refreshTokenSecret, {
    expiresIn: "7d",
  });

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

  refresh: async (refreshToken: string) => {
    try {
      // Verify the refresh token
      const decoded: any = jwt.verify(refreshToken, refreshTokenSecret);

      if (!decoded || !decoded.id) {
        throw new Error("Invalid refresh token");
      }

      // Fetch the user from the database
      const user = await User.findByPk(decoded.id);

      if (!user || !user.userId) {
        throw new Error("User not found");
      }
      // Generate a new access token
      const newAccessToken = jwt.sign({ id: user.userId }, accessTokenSecret, {
        expiresIn: "1h",
      });

      return newAccessToken;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  },
};

export default AuthService;
