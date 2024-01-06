import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

export const serverConfig = {
  serverPort: process.env.SERVER_PORT || 3000,

  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
};
