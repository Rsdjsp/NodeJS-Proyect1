const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const config = require("./database/credentials");
const passport = require("passport");
const { port, oauth_client_id, oauth_callback_url, oauth_client_secret } = require("./database/credentials")

const GoogleStrategy = require('passport-google-oauth20').Strategy;



//Trayendo conexión a BD
const { connection } = require("./database/conection");
connection();

//Importando routers
const app = express();
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");
const filter = require("./routes/filter");


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
app.use(passport.initialize())


passport.use(new GoogleStrategy({
    clientID: oauth_client_id,
    clientSecret: oauth_client_secret,
    callbackURL: oauth_callback_url
}, (accessToken, refreshToken, profile, done) => {
    //console.log({accessToken,refreshToken,profile})
    done(null, { profile })
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

// Utilizando las rutas
movies(app);
users(app);
auth(app,passport);
filter(app);

app.get("/", (req, res) => {
    return res.status(200).send("Hola, bienvenido");
});

app.listen(config.port, () => {
    console.log("Servidor: http://localhost:" + config.port);
});

