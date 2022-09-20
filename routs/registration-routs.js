

function registration(db) {

    async function home(req, res) {



        let regNumbers = await db.getAll();

        res.render("index", {
            regNumbers


        })


    }

    async function check(req, res) {

        console.log("enter")

        const regNumbers = req.body.regNumber;

        var regEx = /[CY|EC|CA]{2}(\s)[0-9]{3}(\s|\-)[0-9]{3}/gi
        var regEx2 = /[0-9]{3}(\s|\-)[0-9]{3}(\s)[EC]{2}/gi

        const isWC = regEx.test(regNumbers);
        const isEC = regEx2.test(regNumbers)

        if (regNumbers) {

            if (await db.checkReg(regNumbers) === true) {
                req.flash('info', 'Duplicate Number');

            } else {
                await db.eachTown(regNumbers)
            }
        }
        if (regNumbers === "") {

            req.flash('info', 'Enter registration');

        } else if (isWC === false && isEC === false) {

            req.flash('info', 'Invalid registration Number');


        }

        res.redirect('/')
    }


    async function filter(req, res) {

        let town = req.body.town

        let number;
        if (town === "all") {
            number = await db.getAll()
        } else {
            number = await db.getTown(town)
            if (number.length === 0) {
                console.log("no reg");
                req.flash('info', 'No registration for this Town yet!');
            }
            else {
                number
            }

        }


        console.log(town);
        res.render("index", {
            regNumbers: number

        })


    }

    async function clear(req, res) {

        await db.clear()
        req.flash('info', "registrations cleared!");

        res.redirect('/')
    }



    return {
        home,
        check,
        filter,
        clear

    }

}
export default registration;