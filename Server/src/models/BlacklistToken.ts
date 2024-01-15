import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class BlacklistToken extends Model {
  public userId!: string;
  public token!: string;
}

BlacklistToken.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "blacklist_tokens",
    sequelize,
  }
);

export default BlacklistToken;
