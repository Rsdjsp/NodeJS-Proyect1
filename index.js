const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const config = require("./database/credentials");


//Trayendo conexión a BD
const { connection } = require("./database/conection");
connection();

//Importando routers
const app = express();
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");

//Usando middleware globales
app.use(express.text())
app.use(express.json());
app.use(
    cors({
        origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
        credentials: true,
    })
);

app.use(cookies());

// Utilizando las rutas
movies(app);
users(app);
auth(app);

app.get("/", (req, res) => {
    return res.status(200).send("Hola, bienvenido");
});

app.listen(config.port, () => {
    console.log("Servidor: http://localhost:" + config.port);
});

