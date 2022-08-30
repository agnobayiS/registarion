function error(){

    var regEx = /[CY|EC|CA]{2}(\s)[0-9]{3}(\s|\-)[0-9]{3}/gi
    
    var regEx2 = /[0-9]{3}(\s|\-)[0-9]{3}(\s)[EC]{2}/gi

    function validateInput(newRegNo1) {
        

        let newRegNo = newRegNo1.toUpperCase()
    

        console.log(newRegNo)


        const isWC = regEx.test(newRegNo);
        const isEC = regEx2.test(newRegNo)


        if (isWC  && isEC === false) {
            return "Enter a valid registration"
        }
       
        else if (newRegNo1 === "") {

            return "Enter a valid registration"
        }

       

    }



    return{
        validateInput
    }

}

export default error;