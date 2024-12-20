import myApp from "./app";
import pool from "./db";

const app = myApp(pool); // Use the actual database pool for the express app

app.listen(8080, () => {
    console.log(`Server running on http://localhost:8080`);
});

export default app;