import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "database-name",
  username: "username",
  password: "password",
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

export { sequelize };
