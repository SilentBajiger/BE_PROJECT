const Digilocker = require('../Models/Digilocker.js');


const storeOriginal = async(file,extractedData,digilocker_user_id,digilocker_password) =>{

    try {
        let doc = {};
        for(key in extractedData){
            if(key === "subject_grades"){
                let list = [];
                list = extractedData[key]?.map((item)=>{
                    return new Object({subject:item['subject'],grade:item['grade']});
                })
                doc[key] = list;
            }
            else{
                doc[key] = extractedData[key];
            }
        }
        console.log("--------------------")
        console.log(doc)
        doc['digilocker_user_id'] = digilocker_user_id
        doc['digilocker_password'] = digilocker_password
        doc['content_type'] = file?.mimetype
        doc['document_type'] = "12th marksheet";
        doc['data'] = file.buffer.toString('base64');
        console.log("--------------------")
        const newDoc = new Digilocker(doc);
        await newDoc.save();
        console.log("Stored Successfully....")
    } catch (error) {
        console.log("got Error in StoreOriginal...");
        console.log(error);
    }
}
module.exports = storeOriginal;