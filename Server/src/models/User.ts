// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/database";
// import { v4 as uuidv4 } from "uuid";

// class User extends Model {
//   public userId!: string;
//   public username!: string;
//   public email!: string;
//   public password!: string;
//   public fullName!: string;
//   public address!: string;
//   public isVerified!: boolean;
//   public isAdmin!: boolean;
// }

// User.init(
//   {
//     userId: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: () => uuidv4(),
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     fullName: {
//       type: DataTypes.STRING,
//     },
//     address: {
//       type: DataTypes.STRING,
//     },
//     isVerified: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     isAdmin: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     tableName: "users",
//     sequelize,
//     underscored: true,
//   }
// );

// export default User;

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { v4 as uuidv4 } from "uuid";
import Cart from "./Cart";
import Wishlist from "./Wishlist";

class User extends Model {
  public userId!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public fullName!: string;
  public address!: string;
  public isVerified!: boolean;
  public isAdmin!: boolean;
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    underscored: true,
  }
);

User.hasMany(Cart, { foreignKey: "userId" });
User.hasMany(Wishlist, { foreignKey: "userId" });
Wishlist.belongsTo(User, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

export default User;
