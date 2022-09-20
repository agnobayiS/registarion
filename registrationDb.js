function registration(db) {

    async function eachTown(newRegNo1) {
        var regEx = /[CY|EC|CA]{2}(\s)[0-9]{3}(\s|\-)[0-9]{3}/gi

        var regEx2 = /[0-9]{3}(\s|\-)[0-9]{3}(\s)[EC]{2}/gi

        let newRegNo = newRegNo1.toUpperCase()
        let townCode = '';

        const isWC = regEx.test(newRegNo);
        const isEC = regEx2.test(newRegNo)


        if (isWC) {
            townCode = newRegNo.substring(0, 2);
        }
        else if (isEC) {
            townCode = newRegNo.substring(newRegNo.length - 2);
        }

        if (townCode) {
            let townId = await db.oneOrNone('select id from regtowns where town_code = $1 ', [townCode])
            await db.none('insert into registration (regnumber, reg_code) values ($1,$2)', [newRegNo, townId.id])
        }


    }


    async function getAllTwo() {
        let all = await db.manyOrNone('select regnumber from registration')

        return all
    }

    async function getAll() {

        let all = await db.manyOrNone('select distinct regnumber from registration')

        return all

    }

    async function getTown(town) {

        let getId = await db.oneOrNone('select id from regtowns where town = $1', [town])
        let getData = await db.manyOrNone('select distinct regnumber from registration where reg_code = $1', [getId.id])
        return getData
    }

    async function checkReg(num) {

        let reg = await db.any('select regnumber from registration where regnumber = $1', [num])
        return reg.length >= 1 ? true : false;
    }

    async function clear() {
        return await db.none('delete from registration')
    }



    return {
        eachTown,
        getAll,
        getTown,
        clear,
        getAllTwo,
        checkReg


    }

}
export default registration;