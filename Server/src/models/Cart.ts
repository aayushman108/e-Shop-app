import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

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
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    //underscored: true,
  }
);

export default Cart;
