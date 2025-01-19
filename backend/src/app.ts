import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

export default function(dbPool:any) {
    // Creating our app and implementing cors
    const app = express();

    app.use(cors({
        origin: "https://simple-full-stack-app.pages.dev",
        credentials: true
    }));

    app.use(compression()); // Reduce the size of data
    app.use(cookieParser()); // Parse cookies from incoming requests
    app.use(bodyParser.json()); // Extract data from incoming body requests

    // Route for the json information created within this file
    app.get("/awesome/applicant", (req : any, res : any) => {
        res.json({ // JSON format for info
            name: "Roger Galan-Manzano",
            hobby: "There are many things that I like to do and some vary on the season, but I really enjoy playing video games and playing volleyball!",
            favoriteFood: "Anything spicy so Mexican platters are the most delicious to me.",
            birthPlace: "Born and lived in Kentucky until my teenage years."
        });
    });

    // Route for the information within the PostgreSQL database
    app.get('/awesome/applicant/db', async (req, res) => {
        try {
            const result = await dbPool.query('SELECT * FROM person_info WHERE id = 1'); // Select first record
            res.json(result.rows);
        } catch (error) {
            console.error('Error querying database:', error);
            res.status(500).send('Error querying database');
        }
    });

    // Route to update the information within the database
    app.post('/awesome/applicant/db', async (req, res) => {
        const { id, name, hobby, favorite_food, birth_place } = req.body;
        try { // Send query to the database
            const result = await dbPool.query(
                'UPDATE person_info SET name = $1, hobby = $2, favorite_food = $3, birth_place = $4 WHERE id = $5 RETURNING *',
                [name, hobby, favorite_food, birth_place, id]
            );
            res.json(result.rows[0]); // Update to first record only
        } catch (error) {
            console.error('Error updating database:', error);
            res.status(500).send('Error updating database');
        }
    });
    

    return app;
}

