const axios = require('axios');
const FormData = require('form-data');

/**
 * Uploads encrypted data to IPFS using Pinata API
 * @param {Buffer} encryptedBuffer - The encrypted file data
 * @param {string} fileName - The file name to store on IPFS
 * @returns {Promise<string>} - IPFS CID
 */
async function uploadToIPFS(encryptedBuffer, fileName) {
    try {
        const formData = new FormData();
        formData.append("file", encryptedBuffer, { filename: fileName });

        const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    pinata_api_key: "7ba9645394622c6f36f3", // Replace with your actual API Key
                    pinata_secret_api_key: "d0b2dab039c6302019dcb4ac1fcaab7766f2ae477cfa7d97f0f55b533390e7a1",
                    ...formData.getHeaders(), // Important for multipart data
                },
            }
        );

        // console.log("IPFS Upload Success:", response.data);
        return {status:200,msg:"Uploaded Successfully on  IPFS ",cid:response.data.IpfsHash}; // ✅ Returns IPFS CID
    } catch (error) {
        console.error("IPFS Upload Error:", error.response ? error.response.data : error.message);
        return {status:400,msg:error.response ? error.response.data : error.message,cid:null};
        // throw new Error("Failed to upload to IPFS");
    }
}


module.exports = { uploadToIPFS };
