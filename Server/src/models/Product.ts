// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/database";
// import { v4 as uuidv4 } from "uuid";
// class Product extends Model {
//   public productId!: string;
//   public productName!: string;
//   public description!: string;
//   public price!: number;
//   public stockQuantity!: number;
//   public imageUrl!: string;
// }

// Product.init(
//   {
//     productId: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: () => uuidv4(),
//     },
//     imageUrl: {
//       type: DataTypes.STRING,
//       defaultValue: "",
//     },
//     productName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     stockQuantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "products",
//     sequelize,
//     underscored: true,
//   }
// );

// export default Product;

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { v4 as uuidv4 } from "uuid";
import Wishlist from "./Wishlist";
import Cart from "./Cart";

class Product extends Model {
  public productId!: string;
  public productName!: string;
  public description!: string;
  public price!: number;
  public stockQuantity!: number;
  public imageUrl!: string;
}

Product.init(
  {
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    sequelize,
    //underscored: true,
  }
);
Product.hasMany(Wishlist, { foreignKey: "productId" });
Product.hasMany(Cart, { foreignKey: "productId" });
Wishlist.belongsTo(Product, { foreignKey: "productId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

export default Product;
