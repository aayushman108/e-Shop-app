import { Model, DataTypes } from "sequelize";

class Cart extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public quantity!: number;
}

export default Cart;
