import { Request, Response } from "express";
import Url from "../models/url.model.js";
import generateShortUrl from "../utils/generateShortUrl.js";

export const createUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
  return res.status(400).json({
    message: "originalUrl is required"
  });
}

try {
  const parsedUrl = new URL(originalUrl);

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
  return res.status(400).json({
    message: "Only HTTP and HTTPS URLs are allowed"
  });
 }
} catch {
  return res.status(400).json({
    message: "Invalid URL"
  });
}

  let shortUrl: string;
  let existingUrl;

do {
  shortUrl = generateShortUrl();

  existingUrl = await Url.findOne({ shortUrl });
} while (existingUrl);

  const url = await Url.create({
  originalUrl,
  shortUrl
 });

  res.json(url);
};

export const getUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  const url = await Url.findOne({ shortUrl });

  if (!url) {
    return res.status(404).json({
      message: "URL not found"
    });
  }

  res.json(url);
};

export const incrementClicks = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  const url = await Url.findOneAndUpdate(
    { shortUrl },
    { $inc: { clicks: 1 } },
    { new: true }
  );

  if (!url) {
    return res.status(404).json({
      message: "URL not found"
    });
  }

  res.json(url);
};

export const deleteUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  const url = await Url.findOneAndDelete({ shortUrl });

  if (!url) {
    return res.status(404).json({
      message: "URL not found"
    });
  }

  res.json({
    message: "URL deleted successfully",
    deletedUrl: url
  });
};

export const redirectUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  const url = await Url.findOneAndUpdate(
    { shortUrl },
    { $inc: { clicks: 1 } },
    { returnDocument: "after" }
  );

  if (!url) {
    return res.status(404).json({
      message: "URL not found"
    });
  }

  res.redirect(url.originalUrl);
};