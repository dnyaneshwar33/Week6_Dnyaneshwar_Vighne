# Bookstore API

A RESTful API for an online bookstore with features including user authentication, book reviews, ratings, external book information integration, and a secure payment system.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)


## Features

- User Authentication (JWT-based)
- Book Reviews and Ratings
- Integration with external book information services
- Secure Payment System (GoCardless)
- CRUD operations for books and authors
- User management
- Comprehensive API endpoints

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL
- GoCardless account

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/bookstore-api.git
    cd bookstore-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables (see [Environment Variables](#environment-variables)).

4. Run database migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Start the server:
    ```bash
    npm start
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/bookstore
JWT_SECRET=your_jwt_secret
GOCARDLESS_ACCESS_TOKEN=your_gocardless_access_token
EXTERNAL_API_KEY=your_external_api_key

## API Endpoints:
# Books:
GET /books - Retrieve a list of all books.
GET /books/:id - Retrieve a specific book by ID.
POST /books - Create a new book (Admin only).
PUT /books/:id - Update an existing book by ID (Admin only).
DELETE /books/:id - Delete a book by ID (Admin only).

# Authors:
GET /authors - Retrieve a list of all authors.
GET /authors/:id - Retrieve a specific author by ID.
POST /authors - Create a new author (Admin only).
PUT /authors/:id - Update an existing author by ID (Admin only).
DELETE /authors/:id - Delete an author by ID (Admin only).

# Users:
POST /register - Register a new user.
POST /login - User login.
GET /users/me - Get current user details (Authenticated users only).

# Reviews:
GET /books/:bookId/reviews - Get reviews for a book.
POST /books/:bookId/reviews - Add a review for a book (Authenticated users only).
DELETE /reviews/:id - Delete a review by ID (Admin or review author only).

# Ratings:
GET /books/:bookId/ratings - Get ratings for a book.
POST /books/:bookId/ratings - Add a rating for a book (Authenticated users only).

# Payment:
POST /orders - Create a new order (Authenticated users only using role of user).
GET /orders/:id - Retrieve a specific order by ID (Authenticated users only using role of user)
