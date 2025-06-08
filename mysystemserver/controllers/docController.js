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
const regionalVerification = require('../utils/regionalVerification.js');
const { getSocket } = require('../utils/socket.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const uploadController = async (req, res) => {
    
    try {

        const socket = getSocket();
        socket.emit('progressUp', { value : 10 });

        // await sleep(1000)

        // socket.emit('progressUp', { value : 40 });

        // await sleep(1000)


        // socket.emit('progressUp', { value : 70 });
        // await sleep(1000)


        // socket.emit('progressUp', { value : 100 });
        // console.log("10%" )

        console.log( process.env.AES_KEY);
        if (!req.file) {
            return res.status(400).json({msg:"NO FILE is there...", error: 'No file uploaded' });
        }
        const {userId , password , digilocker_user_id,digilocker_password} = req.body;
        const originalFileName = req.file.originalname;
        return res.status(200).json({msg:"message", fileName: "554__3353", fileHash:'sfs' });
        



        // console.log("20%")


        //----------------To Store Original Document-------------------------------
        // console.log(req?.file);
        // const response = await Extraction(req?.file);
        // console.log(response?.fields);
        // const documentFields = response?.fields;
        // let extractedData = {}
        // for (const [key, field] of documentFields.entries()) {
        //     if (key === 'subject_grades' && field.values) {
        //     extractedData[key] = field.values.map((item) => new Object({subject:item.subject,grade:item.grade}));
        //     field.values?.forEach((item) => {
        //         console.log(JSON.stringify(item))
        //     });
        //     } else {
        //     extractedData[key] = field.value;
        //     }
        // }
        // await storeOriginal(req.file,extractedData,digilocker_user_id,digilocker_password);
        // console.log(JSON.stringify(extractedData, null, 2));
        // return res.status(200).json({ msg: "File Stored Successfully!!!", fileName: req.file.originalname, fileHash:'sfs' });
        //----------------------Up To This Line------------------------------------------------------------



        //-------------------Store Ref Signature image -----------------------

        // ------------------End Store Ref Signature image -------------------

        
        console.log("20%")

        
        const doc = await Doc.findOne({userId,fileName:originalFileName});
        if(doc){
            console.log(doc);
            return res.status(409).json({msg:"Plz Rename Your File"});
        }
        console.log("30%")
        // -----------------OCR CODE ------------------------
        const digi_data = await getDataFromDigilocker(digilocker_user_id,digilocker_password);
        if(digi_data.status !== 200){
            console.log(digi_data)
            return res.status(404).json({msg:digi_data.msg});
        }
        console.log("40%")
        socket.emit('progressUp', { value : 20 });


        const ocr_data = await Extraction(req?.file);
        if(ocr_data.status !== 200){
            return res.status(404).json({msg:ocr_data.msg});
        }
        console.log("50%")
        socket.emit('progressUp', { value : 30 });


        const compare_result = await compareOcrData(digi_data?.data["_doc"],ocr_data?.fields);
        
        if(compare_result.status !== 200){
            return res.status(400).json({msg:compare_result.msg});
        }
         // -----------------OCR CODE UPTO THIS---------------------------
        console.log("\n\n\n\n")

        socket.emit('progressUp', { value : 40 });



         // -----------------Regional Verification Starts ----------------
        const regional_res_data = await regionalVerification(req?.file,digi_data?.data["_doc"]);
        if(regional_res_data.status !== 200){
            res.status(404).json({ msg:regional_res_data.msg, fileName: "554335--3", fileHash:'sfs' });
        }
         // -----------------Regional Verification Ends ----------------
        
        // return res.status(400).json({msg:regional_res_data.msg, fileName: "554__3353", fileHash:'sfs' });
       
        socket.emit('progressUp', { value : 50 });
       

        console.log("60%");
        const hash_res = generateFileHash(req.file.buffer);
        if(hash_res?.status!== 200){
            return res.status(404).json({status:404,msg:hash_res.msg});
        }
        socket.emit('progressUp', { value : 60 });

        console.log("65%")
        const key = process.env.AES_KEY; // Set a secure password
        const encryptedData = encryptDocument(req?.file?.buffer, key);
        console.log("70%")
        socket.emit('progressUp', { value : 70 });

        const cid_res = await uploadToIPFS(encryptedData,originalFileName);
        if(cid_res.status !== 200){
            console.log("GHUsla")
            return res.status(500).json({status:404,msg:cid_res.msg});
        }
        socket.emit('progressUp', { value : 80 });

        console.log("80%")
        const uniqueId = uuidv4();
        const res_data = await storeOnLedger(uniqueId,cid_res?.cid,hash_res?.fileHash);
        if(res_data.status !== 200){
            return res.status(500).json({status:500,msg:res_data?.msg});
        }
        socket.emit('progressUp', { value : 90 });

        
        console.log("90%")
        const newDoc = new Doc({userId,password,fileName:originalFileName,did:uniqueId,type:req.file.mimetype,size:req.file.size})
        await newDoc.save();
        console.log("100%")
        socket.emit('progressUp', { value : 100 });

        // Send response (Ensure only one response is sent)
        return res.status(200).json({ msg: "File Stored Successfully!!!", fileName: req.file.originalname, fileHash:'sfs' });

    } catch (error) {
        console.error("Error in uploadController:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


const getDocsNameController = async(req,res)=>{
    try {
        console.log("Doc Controller Called : ")
        const userId = req.params.userId;
        const docsNames = await Doc.find({userId});
        // console.log("userId: "+ userId);
        // console.log("docName: "+docsNames);
        if(!docsNames) {
            return res.status(404).json({msg:"No Documents are avaible",docs:[]});
        }
        // console.log("Got User id: "+userId);
        return res.status(200).json({msg:"Got Names",docs:docsNames});
    } catch (error) {
        return res.status(500).json({msg:"error from Server"});
    }
}


const getDoc = async(did)=>{
        console.log("10%")
        const data = await getFromLedger(did);
        // console.log(data);
        console.log("20%");
        if(data.status !== 200){
            return {did:did,status:404,msg:data.msg};
        }

        const doc = await Doc.findOne({did});
        if(!doc){
            return {did:did,status:404,msg:"Doc not found in DocDB"};
        }

        
        console.log("30%")

        const key = process.env.AES_KEY;
        const {cid,hash:originalHash} = data.result;
        const { data: encryptedData, contentType ,status} = await downloadFromIpfs(cid);
        if(status === 400){
            return {did:did,status:404,msg:"Doc not found on IPFS",data};
        }
        console.log("50%")

        const decrypt_res = decryptFile(encryptedData, key);
        if(decrypt_res.status !== 200){
            return {did:did,status:404,msg:decrypt_res.msg,data};
        }
        console.log("60%")

        const isFileValid = compareFileHash(decrypt_res?.decryptedData, originalHash);
        console.log("70%")

        if (!isFileValid) {
            return {status:400, msg: "File verification failed! Hash mismatch." };
        }
        console.log("80%")

        const base64File = decrypt_res?.decryptedData.toString('base64');
        console.log("100%")
        return {
            // ...doc,
            status:200,
            msg: "File verified successfully",
            fileName: doc.fileName,
            did,
            contentType: contentType,
            fileData: base64File,
            type:doc.type,
            size:doc.size
             // 🔹 Sending file as Base64 string
        };
}


const downloadController = async(req,res)=>{
    try {
        const {checkedDocs} = req.body;
        // console.log(checkedDocs);
        // return res.status(200).json({msg:"FILE SUCCESSGULLY"});
        let docs = [];
        let failedDocs = [];
        for (const did of checkedDocs) {

            const doc = await getDoc(did);
            if(doc?.status === 200){
                docs.push(doc);
            }
            else{
                failedDocs.push(doc);
            }
        }
        console.log("FAILED DOCS : " + failedDocs);
        res.json({
            msg: "File verified successfully",
            docs : docs,// 🔹 Sending file as Base64 string
            failedDocs:failedDocs
        });
        // console.log(req.body);
        
        // res.json({msg:"done"});
    } catch (error) {
        console.log("Errro in Downloading " , error);
        res.status(500).json({msg:`Error in Donwloading  ${JSON.stringify(error)}`,});
    }
}

                                    
module.exports = { uploadController , downloadController , getDocsNameController};