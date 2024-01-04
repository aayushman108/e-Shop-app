import { Model, DataTypes } from "sequelize";

class Product extends Model {
  public id!: number;
  public productName!: string;
  public description!: string;
  public price!: number;
  public stockQuantity!: number;
}

export default Product;
