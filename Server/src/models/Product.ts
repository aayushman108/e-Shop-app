import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Product extends Model {
  public productId!: string;
  public productName!: string;
  public description!: string;
  public price!: number;
  public stockQuantity!: number;
}

Product.init(
  {
    productId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
    underscored: true,
  }
);

export default Product;
