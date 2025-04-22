# Blog API

A RESTful API for a blog application built with Node.js, Express, and MongoDB.

## Features

* User Registration and Login with JWT Authentication
* Role-Based Access Control (Author, Admin)
* CRUD operations for Users (Admin only for listing, updating, deleting)
* CRUD operations for Categories (Admin only for creation, updating, deleting)
* CRUD operations for Blogs (Authors can create, edit/delete their own; Admins can manage all)
* Get blogs by category

## Technologies Used

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Tokens (JWT) for authentication
* bcryptjs for password hashing
* express-validator for input validation
* config for environment variables
* nodemon for development

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd blog-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure MongoDB:**
    * Make sure you have MongoDB installed and running.
    * Update the `mongoURI` in `config/default.json` with your MongoDB connection string.

4.  **Set JWT Secret:**
    * Update the `jwtSecret` in `config/default.json` with a strong, secret key.

5.  **Run the server:**
    ```bash
    npm run dev # For development with nodemon
    # or
    npm start   # To run the server
    ```

    The API will be running on