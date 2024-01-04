import { Model, DataTypes } from "sequelize";

class Wishlist extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public addedDate!: Date;
}

export default Wishlist;
