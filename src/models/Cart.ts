import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Cart extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public quantity!: number;
}

export default Cart;
