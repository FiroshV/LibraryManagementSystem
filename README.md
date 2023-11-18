
# Library Management System

## Introduction

This Library Management System is a web-based application built using Node.js and Express.js, designed to help manage the operations of a library. It allows for the cataloging of books, tracking of borrowings, and managing user accounts.

## Features

- Book Cataloging
- Borrow and Return Management
- User Account Management
- Search and Filtering Books
- Real-time Data Updates

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB Database

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/FiroshV/LibraryManagementSystem.git
cd LibraryManagementSystem
```

### Step 2: Install Dependencies

```bash
npm install
```

This command will install all the necessary Node.js packages as defined in the `package.json` file.

### Step 3: Environment Setup

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
MONGODB_URI=[Your_MongoDB_URI]
PORT=[Your_Desired_Port]
JWT_SECRET=[Your_JWT_Secret]
```

- `MONGODB_URI`: Connection string for your MongoDB database.
- `PORT`: The port number on which the server will listen.
- `JWT_SECRET`: Secret key for JSON Web Token authentication.

### Step 4: Start the Application

```bash
npm start
```

This will start the server. By default, it will be accessible at `http://localhost:[PORT]`.

## Usage

After starting the application, you can use a web browser or API testing tool like Postman to interact with the API endpoints.
