import User from "../models/User";
import bcrypt from "bcrypt";

const UserService = {
  signup: async (username: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ username, email, password: hashedPassword });
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

    return user;
  },
};

export default UserService;
