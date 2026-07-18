# ⚡ FlashLink

A high-performance, full-stack backend URL shortener built from scratch. FlashLink provides lightning-fast link redirection by leveraging in-memory caching and a robust containerized architecture.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://flashlink.onrender.com)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue.svg)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Key Features

* **Lightning Fast Redirections:** Implemented **Redis** caching to store frequently accessed URLs, drastically reducing database load and response times.
* **Scalable Architecture:** Built strictly on the **MVC (Model-View-Controller)** design pattern for clean, maintainable, and scalable code.
* **Containerized Deployment:** Fully containerized using **Docker**, ensuring seamless setup and environment consistency across development and production.
* **Analytics Tracking:** Tracks and maintains the total number of clicks/redirections for every shortened URL.
* **RESTful API:** Clean and well-documented API endpoints for link generation and retrieval.

## 🛠️ Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Atlas)
* **Caching Layer:** Redis
* **Containerization:** Docker
* **Deployment:** Render

## ⚙️ Local Setup & Installation

To run this project locally on your machine, follow these steps:

### Prerequisites
* Node.js installed
* Docker & Docker Compose installed (optional, for containerized run)
* MongoDB and Redis instances (local or cloud)

### 1. Clone the repository
`git clone https://github.com/Nikhilkr5/flashlink.git`

`cd flashlink`

### 2. Set up Environment Variables
Create a `.env` file in the root directory and add your credentials:
`PORT=5000`
`MONGO_URI=your_mongodb_connection_string`
`REDIS_URL=your_redis_connection_string`

### 3. Run the Application
**Option A: Using Node (Standard)**
`npm install`
`npm run dev`

**Option B: Using Docker (Recommended)**
`docker-compose up --build`

The server will start running at `http://localhost:5000`.

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/url/shorten` | Generates a new short URL for a given long URL. |
| `GET` | `/:shortId` | Redirects to the original URL and increments the click count. |
| `GET` | `/api/url/analytics/:shortId` | Returns the total click count and analytics for the URL. |

## 👨‍💻 Author

**Nikhil Kumar Thakur**
* GitHub: [@Nikhilkr5](https://github.com/Nikhilkr5)

---
*Feel free to star ⭐ this repository if you find it helpful!*
