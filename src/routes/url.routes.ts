import express from "express";
import { createUrl, getUrl, incrementClicks, deleteUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", createUrl);

router.get("/:shortUrl", getUrl);

router.patch("/:shortUrl/click", incrementClicks);

router.delete("/:shortUrl", deleteUrl);

export default router;