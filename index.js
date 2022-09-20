import express from "express";
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash from 'express-flash';
import routs from './routs/registration-routs.js'

const app = express();



import pgPromise from 'pg-promise';

const pgp = pgPromise({})

const local_database_url = 'postgres://siyabonga:siya@localhost:5432/ragistrations';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config = {
    connectionString
}
if (process.env.NODE_ENV == "production") {
    config.ssl = {
        rejectUnauthorized: false
    }
}

app.use(session({
    secret: 'codeforgeek',
    saveUninitialized: true,
    resave: true
}));


const db = pgp(config);


import regFF1 from './registrationDb.js'


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(flash());

const regFF = regFF1(db)
const regRouts = routs(regFF)

app.get('/', regRouts.home);
app.post('/registration', regRouts.check);
app.post('/filter', regRouts.filter);
app.get('/clear', regRouts.clear);



const PORT = process.env.PORT || 3034;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});