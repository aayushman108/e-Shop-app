import { Model, DataTypes } from "sequelize";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public fullName!: string;
  public address!: string;
  public isAuthenticated!: boolean;
  public isAdmin!: boolean;
}

export default User;
