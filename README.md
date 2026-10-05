# URL Shortener API

A RESTful URL Shortener API built with Node.js, Express, TypeScript, and MongoDB.

The API allows users to create short URLs, redirect to original URLs, track click counts, retrieve URL information, and delete shortened URLs.

## Features

- Create shortened URLs
- Generate unique 6-character short URLs
- Validate original URLs
- Allow only HTTP and HTTPS URLs
- Redirect short URLs to their original URLs
- Track click counts
- Retrieve URL information
- Delete shortened URLs
- MongoDB persistence
- TypeScript for type safety
- RESTful API architecture
- Environment-based configuration

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Git
- GitHub

## Project Structure

```text
src/
├── config/
│   └── db.ts
├── controllers/
│   └── url.controller.ts
├── models/
│   └── url.model.ts
├── routes/
│   └── url.routes.ts
├── utils/
│   └── generateShortUrl.ts
├── app.ts
└── server.ts
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account

### Installation

Clone the repository:

```bash
git clone https://github.com/nehal-7024/url-shortener-api.git
```

Navigate to the project directory:

```bash
cd url-shortener-api
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
```

Do not commit your `.env` file to GitHub.

## Running the Project

### Development

Start the development server:

```bash
npm run dev
```

The server will run at:

```text
http://localhost:5000
```

### Production Build

Build the TypeScript project:

```bash
npm run build
```

Start the compiled application:

```bash
npm start
```

## API Endpoints

### 1. Create a Short URL

```http
POST /urls
```

Request body:

```json
{
  "originalUrl": "https://www.google.com"
}
```

Example response:

```json
{
  "originalUrl": "https://www.google.com",
  "shortUrl": "aK7xP2",
  "clicks": 0
}
```

---

### 2. Get URL Information

```http
GET /urls/:shortUrl
```

Example:

```http
GET /urls/aK7xP2
```

Returns information about the shortened URL, including its original URL and click count.

---

### 3. Redirect to Original URL

```http
GET /:shortUrl
```

Example:

```text
http://localhost:5000/aK7xP2
```

Visiting the short URL redirects the user to the original URL and increments the click count.

---

### 4. Increment Click Count

```http
PATCH /urls/:shortUrl/click
```

Example:

```http
PATCH /urls/aK7xP2/click
```

Increments the click count of the specified short URL.

---

### 5. Delete a Short URL

```http
DELETE /urls/:shortUrl
```

Example:

```http
DELETE /urls/aK7xP2
```

Deletes the specified shortened URL.

---

### 6. Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "healthy"
}
```

## URL Validation

The API validates the original URL before storing it.

Only the following protocols are allowed:

- `http:`
- `https:`

Examples of valid URLs:

```text
https://google.com
http://example.com
```

Invalid or unsupported URLs return a `400 Bad Request` response.

## Error Handling

The API handles common errors including:

- Missing `originalUrl`
- Invalid URLs
- Unsupported URL protocols
- Non-existent short URLs

Appropriate HTTP status codes such as `400` and `404` are returned.

## How Short URLs Are Generated

Each shortened URL receives a randomly generated 6-character code using:

- Lowercase letters
- Uppercase letters
- Numbers

The generated short URL is checked against the database to avoid collisions.

The database also enforces uniqueness on the `shortUrl` field.

## Database

MongoDB is used for persistent storage, with Mongoose as the ODM.

Each URL document contains:

```text
originalUrl
shortUrl
clicks
createdAt
```

## Future Improvements

- Add automated tests
- Add centralized error-handling middleware
- Add request validation middleware
- Add rate limiting
- Add authentication
- Add custom short URLs
- Add URL expiration
- Add analytics
- Add API documentation
- Deploy the API

## Author

Nehal

## License

This project is for learning and portfolio purposes.
```
