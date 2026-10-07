import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import productRoutes from "./modules/products/product.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: env.nodeEnv === "production" ? env.corsOrigins : true,
  }),
);
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak percobaan, coba lagi nanti" },
});

app.get("/", (_req, res) => {
  res.json({ message: "express-boilerplate-multidb API" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

export default app;
