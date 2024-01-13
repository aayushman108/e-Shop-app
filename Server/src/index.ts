import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sequelize } from "./config/database";
import { serverConfig } from "./config/config";
import { genericErrorHandler, notFoundError } from "./middlewares/ErrorHandler";
// Routes
import userRoutes from "./routes/UserRoutes";
import productRoutes from "./routes/ProductsRoutes";
import wishlistRoutes from "./routes/WishlistRoutes";
import cartRoutes from "./routes/CartRoutes";
import homeRoutes from "./routes/HomeRoute";
import Product from "./models/Product";
import User from "./models/User";
import Wishlist from "./models/Wishlist";
import Cart from "./models/Cart";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/", homeRoutes);

app.use(genericErrorHandler);

app.use(notFoundError);

Product.sync({ force: false });
User.sync({ force: false });
Wishlist.sync({ force: true });
Cart.sync({ force: true });

//sequelize.sync();

app.listen(serverConfig.serverPort, () => {
  console.log(
    `Server is running at http://localhost:${serverConfig.serverPort}`
  );
});
