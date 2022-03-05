const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const session = require("express-session");

const { port, session_secret, mode } = require("./database/credentials");

console.log(mode);

//Trayendo conexión a BD
const { connection } = require("./database/conection");
connection();

//Importando routers
const app = express();
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");
const filter = require("./routes/filter");
const reviews = require("./routes/reviews");

//Usando middleware globales
app.use(express.text());
app.use(express.json());
app.use(
  cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookies());

// Utilizando las rutas
movies(app);
users(app);
auth(app);
filter(app);
reviews(app);

app.get("/", (req, res) => {
  return res.status(200).send("Hola, bienvenido");
});

app.listen(port, () => {
  console.log("Servidor: http://localhost:" + port);
});
