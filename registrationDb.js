function registration(db) {

    var regEx = /[CY|EC|CA]{2}(\s|\-)[0-9]{3}(\s|\-)[0-9]{3}/gi

    var regEx2 = /[0-9]{3}(\s|\-)[0-9]{3}(\s|\-)[EC]{2}/gi


    async function eachTown(newRegNo1) {

        let newRegNo = newRegNo1.toUpperCase()

        if (regEx.test(newRegNo)) {
            let townCode = newRegNo.substring(0, 2);
            let townId = await db.oneOrNone('select id from regtowns where town_code = $1 ', [townCode])
            // console.log(townId)

            let isertReg = await db.none('insert into registration (regnumber, reg_code) values ($1,$2)', [newRegNo, townId.id])
        }

        if (regEx2.test(newRegNo)) {
            let townCode = newRegNo.substring(newRegNo.length - 2);
            let townId = await db.oneOrNone('select id from regtowns where town_code = $1 ', [townCode])
            // console.log(townId)

            let isertReg = await db.none('insert into registration (regnumber, reg_code) values ($1,$2)', [newRegNo, townId.id])
        }


    }

    async function getAll() {

        let all = await db.manyOrNone('select regnumber from registration')

        console.log(all)
        return all

    }




    async function getTown(town) {


        if (town === capeTown) {
            await db.manyOrNone('select CAPE_TOWN from registration')
        }

        if (town === easternCape) {
            await db.manyOrNone('select EASTERN_CAPE from registration')
        }
        if (town === bellville) {
            await db.manyOrNone('select BELLVILLE from registration')
        }
        if (town === allReg) {
            await db.manyOrNone('select * from registration')
        }

    }

    async function clear() {
        await db.none('delete from registration')
        
    }

    


    return {
        eachTown,
        getAll,
        getTown,
        clear


    }

}
export default registration;