import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Wishlist extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public addedDate!: Date;
}

export default Wishlist;
