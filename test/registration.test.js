import assert from 'assert';
import regNumbers from '../registrationDb.js'
import pgPromise from 'pg-promise'
import pg from "pg"

const pgp = pgPromise({})



const local_database_url = 'postgres://siyabonga:siya@localhost:5432/registration';
const connectionString = process.env.DATABASE_URL || local_database_url;

const db = pgp(connectionString);
const registration = regNumbers(db)


describe("registration database test", async function () {



    beforeEach(async function () {
        await db.manyOrNone('delete from registration')

    });


    it("should display all registration from cape town in the database", async function () {

        await registration.capeTownReg("ca 123 321")
        await registration.capeTownReg("ca 321 123")
        await registration.capeTownReg("cy 123 321")

        console.log(registration)

        assert.deepEqual( [] ,await registration.getTown() )




    })

    // it("should display nothing if the clear botton is pressed and the are 1 names in the database", async function () {

    //     await greet.greetName("athi")
    //     await greet.clear()


    //     assert.deepEqual( [] , await greet.getNames() )

    // });
    
    // it(" the counter should display (2) if the are 2 names in the dataabse table", async function () {

    //     await greet.greetName("siya");
    //     await greet.greetName("athi");

    //     assert.equal(2, await greet.counter())
    // });
   
    
    // it("the persons counter ", async function () {

    //     await greet.greetName("siya");
    //     await greet.greetName("athi");
    //     await greet.greetName("siya");
    //     await greet.greetName("siya");


    //     assert.deepEqual( {
    //         counter: 3,
    //         greeted_names: 'Siya'
    //       }
    //       , await greet.userCounter('Siya'))
    // });
    
    
    // it("should display (  0 ) if the is no names in the dataabse table", async function () {
        
        
    //     assert.equal(0, await greet.counter())
    // });
    
    // it("should display name if name is the name in the database", async function () {

    //     await greet.greetName("siya");
    //     assert.deepEqual([ { greeted_names: 'Siya' } ]
    //     , await greet.getNames())

    // });





    after(async function () {
        await db.manyOrNone('Truncate registration');
    })
})
