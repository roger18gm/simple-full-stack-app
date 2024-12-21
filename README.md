# Vivacity Tech Exercise

Roger Galan Manzano
- roger18gm@gmail.com
- [LinkedIn Profile](https://www.linkedin.com/in/roger-galan-manzano-819babb9/)


## Overview

This project is a web application that includes a backend built with TypeScript, Node.js, and Express, and a frontend built with React and TypeScript. The backend serves API endpoints that provides information about the developer, and the frontend displays this information in a professional user interface when the user clicks a picture.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v16.x or later)
- **npm** (Node Package Manager, comes with Node.js)
- **PostgreSQL** (if you are running the database locally)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Set Up the Backend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Utilize the `.env` file found in the repository backend directory:

   **Certainly not the most secure or professional method to deliver these environment 
   variables but it was the most practical for this exercise. If there are issue with 
   connecting to the database with these credentials through pgAdmin or another similar
   tool, please reach out to me.**

   ```plaintext
   DB_HOST= AWS PostgreSQL connection address endpoint provided in repository
   DB_PORT=5432
   DB_USER= provided in repository
   DB_PASSWORD= provided in repository
   DB_NAME= provided in repository
   ```

3. Run the backend server:
   ```bash
   npm start
   ```

   The server will start at `http://localhost:8080`.

### 3. Set Up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend/react-ts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will start at `http://localhost:5174`.

---

## Usage

1. Navigate to the frontend application in your browser (`http://localhost:5174`).
2. Click on the picture(s) of the developer.
3. The application will call the API endpoint (`http://localhost:8080/awesome/applicant`) and display the information retrieved from the backend.
4. The application will call the API endpoint (`http://localhost:8080/awesome/applicant/db`) and display the information retrieved from the database.
5. Click on the Edit button to alter the values within a form.
6. The application will call the API endpoint (`http://localhost:8080/awesome/applicant/db`) and update the information retrieved from the database.

---

## Database Setup (Only if not connecting to the AWS hosted PostgreSQL database)

1. Ensure PostgreSQL is installed and running.
2. Create a new database:
   ```sql
   CREATE DATABASE your_database;
   ```
3. Create the necessary table:
   ```sql
   CREATE TABLE person_info (
       id SERIAL PRIMARY KEY
       ,name VARCHAR(100)
       ,hobby TEXT
       ,favorite_food TEXT
       ,birth_place TEXT
   );
   ```
4. Optionally, seed the database with initial data:
   ```sql
   INSERT INTO person_info (name, hobby, favorite_food, birth_place) VALUES ('Your Name', 'Sports', 'Tacos', 'U.S.');
   ```

---

## Testing 

### Unit Tests

1. Install Jest and dependencies:
   ```bash
   npm install --save-dev jest ts-jest @types/jest
   ```
2. Run tests: (While the backend server isn't running)
   ```bash
   npm test
   ```

---

## Technologies Used

- **Backend**: TypeScript, Node.js, Express
- **Frontend**: React, TypeScript
- **Database**: PostgreSQL, pgAdmin

---

## References

https://www.youtube.com/watch?v=I_fTQTsz2nQ&t=18s
https://www.youtube.com/watch?v=Fb2UHQJMsYQ
https://www.youtube.com/watch?v=WFT5MaZN6g4
https://www.youtube.com/watch?v=r5L1XRZaCR0
https://www.youtube.com/watch?v=yOC0e0NMZ-E
https://www.youtube.com/watch?v=IDjF6-s1hGk
