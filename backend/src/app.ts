import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

export default function(dbPool:any) {
 
    const app = express();

    app.use(cors({
        credentials: true,
        origin: true
    }));

    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.json());

    app.get("/awesome/applicant", (req : any, res : any) => {
        res.json({
            name: "Roger Galan-Manzano",
            hobby: "There are many things that I like to do and some vary on the season, but I really enjoy playing video games and playing volleyball!",
            favoriteFood: "Anything spicy so Mexican platters are the most delicious to me.",
            birthPlace: "Born and lived in Kentucky until my teenage years."
        });
    });

    app.get('/awesome/applicant/db', async (req, res) => {
        try {
            const result = await dbPool.query('SELECT * FROM person_info WHERE id = 1');
            res.json(result.rows);
        } catch (error) {
            console.error('Error querying database:', error);
            res.status(500).send('Error querying database');
        }
    });

    app.post('/awesome/applicant/db', async (req, res) => {
        const { id, name, hobby, favorite_food, birth_place } = req.body;
        try {
            const result = await dbPool.query(
                'UPDATE person_info SET name = $1, hobby = $2, favorite_food = $3, birth_place = $4 WHERE id = $5 RETURNING *',
                [name, hobby, favorite_food, birth_place, id]
            );
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error updating database:', error);
            res.status(500).send('Error updating database');
        }
    });
    

    return app;
}

