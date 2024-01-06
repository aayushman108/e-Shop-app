import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./config/database";
import { serverConfig } from "./config/config";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
import userRoutes from "./routes/UserRoutes";
import productRoutes from "./routes/ProductsRoutes";
import wishlistRoutes from "./routes/WishlistRoutes";
import cartRoutes from "./routes/CartRoutes";
import homeRoutes from "./routes/HomeRoute";

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/", homeRoutes);

sequelize.sync({ force: true });

app.listen(serverConfig.serverPort, () => {
  console.log(
    `Server is running at http://localhost:${serverConfig.serverPort}`
  );
});
