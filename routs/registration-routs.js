

function registration(db){

    async function home (req, res) {



        let regNumbers = await db.getAll();
       
    
        res.render("index", {
            regNumbers
    
    
        })
    
    
    }

    async function check (req, res) {

        console.log("enter")
    
        const regNumbers = req.body.regNumber;
    
    
        if (regNumbers) {
            
            console.log(await db.checkReg(regNumbers));
            
            if (await db.checkReg(regNumbers) === true) {
                req.flash('info','Duplicate Number');
    
            } else {
                await db.eachTown(regNumbers)
            }
        }
        if (regNumbers === "" ) {
    
            req.flash('info','Enter registration');
            
        }
    
    
        res.redirect('/')
    
    }
    async function  filter (req, res) {

        let town = req.body.town
    
        let number;
        if(town === "all"){
          number =  await db.getAll()
        }else{
         number =  await db.getTown(town)
        }

    
        
    
        console.log(town);
        res.render("index", {
            regNumbers: number
    
        })
    
    }

    async function  clear (req, res) {

        await db.clear()
        req.flash('info', "registrations cleared!");
    
        res.redirect('/')
    }





    return{
        home,
        check,
        filter,
        clear

    }

}


export default registration;