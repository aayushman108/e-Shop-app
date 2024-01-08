import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";
import Product from "./Product";

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
      references: {
        model: User,
        key: "user_id",
      },
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Product,
        key: "product_id",
      },
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
  }
);

export default Wishlist;
