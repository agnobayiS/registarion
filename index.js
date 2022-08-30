import express from "express";
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash from 'express-flash';
import registrationFunction from './registrationDb.js';
import error from './registration-logic.js'


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
const regFF = regFF1(db)


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

import fs from 'fs';
import handlebars from 'handlebars';
import { ppid } from 'process';

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(flash());

app.get('/', async function (req, res) {



    let regNumbers = await regFF.getAll();
   

    res.render("index", {
        regNumbers


    })


});

app.post('/registration', async function (req, res) {

    console.log("enter")

    const regNumbers = req.body.regNumber;
    let allreg = await regFF.getAllTwo();

    if (regNumbers) {
        console.log(await regFF.checkReg(regNumbers));
        if (await regFF.checkReg(regNumbers) === true) {
            req.flash('info','Duplicate Number');

        } else {
            await regFF.eachTown(regNumbers)
        }
    }
    if (regNumbers === "" ) {

        req.flash('info','Enter registration');
        
    }


    res.redirect('/')

})

app.post('/filter', async function (req, res) {

    let town = req.body.town
    let number;
    if(town === "all"){
      number =  await regFF.getAll()
    }else{
     number =  await regFF.getTown(town)
    }

    console.log(town);
    res.render("index", {
        regNumbers: number

    })

})

app.get('/clear', async function (req, res) {

    await regFF.clear()
    req.flash('info', "registrations cleared!");

    res.redirect('/')
})



const PORT = process.env.PORT || 3034;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});