import express from "express";
import urlRoutes from "./routes/url.routes.js";
import { redirectUrl } from "./controllers/url.controller.js";

const app = express();

app.use(express.json());

app.use("/urls", urlRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "healthy"
  });
});

app.get("/:shortUrl", redirectUrl);

export default app;