const axios = require('axios');

/**
 * Fetch a file from IPFS using its CID
 * @param {string} cid - The IPFS CID of the file
 * @returns {Promise<Buffer>} - The file data as a Buffer
 */
const downloadFromIpfs = async (cid) => {
    try {
        // const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
        // console.log("url : ",ipfsUrl);

        const response = await axios.get(ipfsUrl, { responseType: 'arraybuffer' });
        // https://gateway.pinata.cloud/ipfs/
        return {
            status:200,
            data: response.data,
            contentType: response.headers['content-type'] || 'application/octet-stream'
        };
    } catch (error) {
        console.error("IPFS Fetch Error:", error);
        return {
            status:400,
            data: error.response.data,
            contentType: response.headers['content-type'] || 'application/octet-stream'
        };

        // throw new Error("Failed to fetch file from IPFS");
    }
};

module.exports = { downloadFromIpfs };
