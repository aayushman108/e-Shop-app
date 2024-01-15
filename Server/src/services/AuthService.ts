import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serverConfig } from "../config/config";
import { ISignup } from "../interface/Signup";
import { ILogin } from "../interface/Login";
import BadRequestError from "../error/BadRequestError";
import BlacklistToken from "../models/BlacklistToken";

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
  signup: async (body: ISignup) => {
    const { username, email, password } = body;

    console.log(body);
    const userEmailExists = await AuthService.getUserByEmail(email);
    if (userEmailExists) {
      throw new BadRequestError(`User with email: ${email} already exists`);
    }

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

  login: async (body: ILogin) => {
    const { email, password } = body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError("Invalid Email or Password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError("Invalid Email or Password");
    }

    // Generate token pair (access token and refresh token)
    const tokenPair = generateTokens(user);

    // Return the user and tokens
    return { user, ...tokenPair };
  },

  logout: async (userId: string, refreshToken: string) => {
    try {
      const isRefreshTokenValid = await AuthService.isRefreshTokenValid(
        refreshToken
      );

      await BlacklistToken.create({ userId, token: refreshToken });

      if (!isRefreshTokenValid) {
        return { message: "Logout successful" };
      }

      return { message: "Logout successful" };
    } catch (error) {
      throw error;
    }
  },

  isRefreshTokenValid: async (refreshToken: string) => {
    const tokenExists = await BlacklistToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    return !tokenExists;
  },

  refresh: async (refreshToken: string) => {
    try {
      // Verify if the refresh token is blacklisted
      const isRefreshTokenValid = await AuthService.isRefreshTokenValid(
        refreshToken
      );

      if (!isRefreshTokenValid) {
        throw new BadRequestError("Invalid refresh token");
      }
      // Verify the refresh token
      const decoded: any = jwt.verify(refreshToken, refreshTokenSecret);

      if (!decoded || !decoded.id) {
        throw new BadRequestError("Invalid refresh token");
      }

      // Fetch the user from the database
      const user = await User.findByPk(decoded.id);

      if (!user || !user.userId) {
        throw new BadRequestError("User not found");
      }
      // Generate a new access token
      const newAccessToken = jwt.sign({ id: user?.userId }, accessTokenSecret, {
        expiresIn: "1h",
      });

      return newAccessToken;
    } catch (error) {
      throw new BadRequestError("Invalid refresh token");
    }
  },

  getUserByEmail: async (email: string) => {
    return User.findOne({ where: { email } });
  },
};

export default AuthService;
