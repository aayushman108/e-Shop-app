// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/database";
// import User from "./User";
// import Product from "./Product";

// class Wishlist extends Model {
//   public wishlistId!: number;
//   public userId!: string;
//   public productId!: string;
//   public addedDate!: Date;
// }

// Wishlist.init(
//   {
//     wishlistId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: User,
//         key: "user_id",
//       },
//     },
//     productId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: Product,
//         key: "product_id",
//       },
//     },
//     addedDate: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     tableName: "wishlists",
//     sequelize,
//     underscored: true,
//   }
// );

// export default Wishlist;

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Wishlist extends Model {
  public wishlistId!: number;
  public userId!: string;
  public productId!: string;
  public addedDate!: Date;
}

Wishlist.init(
  {
    wishlistId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    addedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "wishlists",
    sequelize,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "product_id"],
      },
    ],
  }
);

export default Wishlist;
