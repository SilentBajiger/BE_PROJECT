const axios = require('axios');

const storeOnLedger = async(docID,cid,hash)=>{
// const storeOnLedger = async(docID,cid,hash) =>{
    // return "ok";
    try {
        console.log("SENDING DATA FROM FUNCTION : "+docID," ",cid," ",hash)
        const response = await axios.post(
                    "http://127.0.0.1:4000/store",
                    {docID:docID,hash:hash,cid:cid},
                    {
                        headers: {
                            'Content-Type':'application/json'
                        },
                    }
                );
        console.log("Doc Stored Successfully with ID" + docID);
        return {status:200,msg:"Doc Stored on Hyperledger Successfully...",data:response.data};
    } catch (error) {
        console.log("Eroor in storing Data on Ledger" );
        // console.log(error);
        // console.log(JSON.stringify(error))
        return {status:400,msg:error?.response?.data?.msg || error?.message,data:error?.response?.data};
    }
}

module.exports = {storeOnLedger};