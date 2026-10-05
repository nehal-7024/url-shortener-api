const generateShortUrl = (): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let shortUrl = "";

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * characters.length);

    shortUrl += characters[index];
  }

  return shortUrl;
};

export default generateShortUrl;