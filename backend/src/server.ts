import myApp from "./app";
import pool from "./db";

const app = myApp(pool);

app.listen(8080, () => {
    console.log(`Server running on http://localhost:8080`);
});

export default app;