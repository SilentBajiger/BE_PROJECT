const Digilocker = require('../Models/Digilocker.js');


const getDataFromDigilocker = async(digilocker_user_id,digilocker_password) =>{
    try {
        const digilocker_data = await Digilocker.findOne({
            digilocker_user_id,digilocker_password},
            {digilocker_user_id:0,digilocker_password:0});
        if(!digilocker_data){
            return {status:202,msg:"Invalid Credentials For Digilocker"};
        }
        return {status:200,msg:"Data is Available",data:{...digilocker_data}};
    } catch (error) {
        console.log("Error in Getting DataFrom Digilocker - - -- " + error?.message);
        return {status:202,msg:"There is an Error" + error?.message};
    }
}
module.exports = getDataFromDigilocker;