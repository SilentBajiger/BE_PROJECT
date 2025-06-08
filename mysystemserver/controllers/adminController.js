const { encryptDocument } = require('../utils/encrypt.js');
const generateFileHash = require('../utils/hash.js');
const { uploadToIPFS } = require('../utils/uploadToIpfs.js');
const Doc = require('../Models/Doc.js');
const { v4: uuidv4 } = require('uuid');
const Fabric = require('../Models/Fabric.js');
const User = require('../Models/User.js');
const { downloadFromIpfs } = require('../utils/DownlaodFromIpfs.js');
const { decryptFile } = require('../utils/decrypt.js');
const { compareFileHash } = require('../utils/compare.js');
const { storeOnLedger } = require('../utils/storeOnLedger.js');
const { getFromLedger } = require('../utils/getFromLedger.js');
const Extraction = require('../utils/Extraction.js');
const storeOriginal = require('../utils/storeOriginal.js');
const compareOcrData = require('../utils/compareOcrData.js');
const getDataFromDigilocker = require('../utils/getDataFromDigilocker.js');

const adminUploadController = async (req, res) => {
    
    try {
        const file1 = req.files['original']?.[0];
        const file2 = req.files['reference']?.[0];

        if (!file1 || !file2) {
        return res.status(400).json({ msg: "Both files are required." });
        }
        console.log("10%")
        console.log("HI.....")
        console.log( process.env.AES_KEY);
        // if (!req.file) {
        //     return res.status(400).json({msg:"NO FILE is there...", error: 'No file uploaded' });
        // }

        const {userId , password , digilocker_user_id,digilocker_password} = req.body;
        console.log(file1)
        console.log(file2)
        // return res.status(200).json({ msg: "File Stored Successfully!!!", fileName: "req.file.originalname", fileHash:'sfs' });


        //----------------To Store Original Document-------------------------------
        console.log(file1);
        const response = await Extraction(file1);
        console.log(response?.fields);
        const documentFields = response?.fields;
        console.log("FIELD:::" ,documentFields)
        let extractedData = {}
        for (const [key, field] of documentFields.entries()) {
            if (key === 'subject_grades' && field.values) {
            extractedData[key] = field.values.map((item) => new Object({subject:item.subject,grade:item.grade}));
            field.values?.forEach((item) => {
                console.log(JSON.stringify(item))
            });
            } else {
            extractedData[key] = field.value;
            }
        }
        await storeOriginal(file2,extractedData,digilocker_user_id,digilocker_password);
        console.log(JSON.stringify(extractedData, null, 2));
        return res.status(200).json({ msg: "File Stored Successfully!!!", fileName: file1.originalname, fileHash:'sfs' });
    } catch (error) {
        console.error("Error in uploadController:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = adminUploadController