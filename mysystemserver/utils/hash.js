

const { sha3_256 } = require('js-sha3');

function generateFileHash(fileBuffer) {
    try {
        const fileHash = sha3_256(fileBuffer);
        // console.log('Generated SHA-3 Hash:', fileHash);
        return {status:200,msg:"Hash Generated Successfully...",fileHash:fileHash};
    } catch (err) {
        console.error('Error hashing file:', err);
        return {status:400,msg:"Error in hash generation..",fileHash:null};
    }
}

module.exports = generateFileHash ;




































// const fs = require('fs');
// const { sha3_256 } = require('js-sha3');


// function generateFileHash(filePath) {
//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return;
//         }

//         // Generate SHA-3 hash (256-bit) for the file data
//         const fileHash = sha3_256(data);
//         console.log('Generated SHA-3 Hash:', fileHash);

//         // Return or save the hash for later comparison
//         return fileHash;
//     });
// }

// // const filePath = 'Smallpdf-2024-08-11.pdf'; // Replace with your file path
// const filePath = '_10th.jpg'; // Replace with your file path
// generateFileHash(filePath);
