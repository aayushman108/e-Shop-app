import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";
import Product from "./Product";

class Cart extends Model {
  public cartId!: number;
  public userId!: string;
  public productId!: string;
  public quantity!: number;
}

Cart.init(
  {
    cartId: {
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "product_id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "carts",
    sequelize,
    underscored: true,
  }
);

export default Cart;
