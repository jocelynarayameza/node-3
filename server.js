import express from "express";
import cors from "cors";
import pg from "pg";
const { Pool } = pg;

const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Yoshi123*',
    database: 'likeme',
    allowExitOnIdle: true
})

app.get("/posts", async (req, res) => {
    try {
        const {rows} = await pool.query("SELECT * FROM posts");
        console.log(rows)
        res.send(rows)
    } catch (error) {
        res.send(error)
    }
})

app.post("/posts", async (req, res) => {
    try {
        const {titulo, url, descripcion} = req.body;
        const argumentos = {
            text: "INSERT INTO posts (titulo, img, descripcion) VALUES($1, $2, $3)",
            values: [titulo, url, descripcion]
        }
        await pool.query(argumentos)
        res.send("Post agregado con éxito") 
    } catch (error) {
        res.send(error)
    }
})

app.listen(3000, console.log("Escuchando desde el puerto 3000"))
