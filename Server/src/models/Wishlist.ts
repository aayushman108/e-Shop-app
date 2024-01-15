import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

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
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    addedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "wishlists",
    sequelize,
    //underscored: true,
  }
);

export default Wishlist;
