const axios = require('axios');

const getFromLedger = async(docID)=>{
// const storeOnLedger = async(docID,cid,hash) =>{
    // return "ok";
    try {
        console.log("RETRIEVING DATA FROM FUNCTION : "+docID)
        const response = await axios.get(
                    `http://127.0.0.1:4000/retrieve/${docID}`,
                    
                    {
                        headers: {
                            'Content-Type':'application/json'
                        },
                    }
                );
        console.log("Doc Stored Successfully with ID" + docID);
        return response.data;
    } catch (error) {
        console.log("Eroor in retriveing Data on Ledger" );
        // console.log(error.response.data);
        console.log(error.response.data);
        return error.response.data;
    }
}

module.exports = {getFromLedger};