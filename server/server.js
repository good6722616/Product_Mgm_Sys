import express from "express";
import { connectDatabase } from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// const __dirname = path.resolve();
// app.use("/api/v1/uploads", express.static(path.join(__dirname, "/uploads")));
