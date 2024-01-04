import express from "express";
import bodyParser from "body-parser";

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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
