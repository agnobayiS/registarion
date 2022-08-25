// const express = require('express');
import express from "express";
import exphbs from'express-handlebars';
import registrationFunction from './registrationDb.js';

const app = express();



import pgPromise from 'pg-promise';

const pgp = pgPromise ({})

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

const db = pgp(config);


import regFF1 from './registrationDb.js'
const regFF = regFF1(db) 


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

import fs from 'fs';
import handlebars from 'handlebars';
import { ppid } from 'process';

app.use(express.urlencoded({extended:false}))
app.use(express.json())


// const reg = []

app.get('/', async function (req, res) {
    
    

   let regNumbers = await regFF.getAll();
    
    res.render("index",{
        regNumbers

    })


});

app.post('/registration',async function (req, res) {

    const regNumbers = req.body.regNumber;
    
    // console.log(regNumbers)
    
    if (regNumbers) {
      await  regFF.eachTown(regNumbers)
    }

    res.redirect('/')

})

app.get('/clear', async function (req, res) {
     await db.clear()
    // req.flash('info', "registrations cleared!");


    res.redirect('/')
})








const PORT = process.env.PORT || 3034;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});