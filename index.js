const express = require('express')
const exphbs = require('express-handlebars');
const registrationFunction = require('./registrationDb');

const app = express();



const pgp = require('pg-promise')({});

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


const regFF = require('./registrationDb')(db)

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

const fs = require('fs');
const handlebars = require('handlebars');
const { ppid } = require('process');

app.use(express.urlencoded({extended:false}))
app.use(express.json())


// const reg = []

app.get('/', async function (req, res) {
    
    // const regNumbers = req.body.regNumber;
    // let town = req.body.town
    
    // if(regNumbers){
    //     await db.getTown(regNumbers)
    // }
    // if(town){
    //     await db.getTown(town)
    // }

   let regNumbers = await regFF.getAll();
    
    res.render("index",{
        regNumbers

    })
    
    // console.log(town)
    // console.log(regNumbers)

});

app.post('/registration',async function (req, res) {

    const regNumbers = req.body.regNumber;
    
    // console.log(regNumbers)
    
    if (regNumbers) {
      await  regFF.eachTown(regNumbers)
    }

    res.redirect('/')

})








const PORT = process.env.PORT || 3034;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});