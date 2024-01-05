import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "e-shop",
  username: "e_shop_user",
  password: "P@ssword123",
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export { sequelize };
