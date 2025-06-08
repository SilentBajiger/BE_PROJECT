const { sha3_256 } = require('js-sha3');

/**
 * Compare SHA-3 hash of a file buffer with an original hash
 * @param {Buffer} fileBuffer - The file data
 * @param {string} originalHash - The stored hash
 * @returns {boolean} - `true` if hashes match, `false` if they don't
 */
const compareFileHash = (fileBuffer, originalHash) => {
    const currentHash = sha3_256(fileBuffer);
    // console.log('Current File Hash:', currentHash);
    // console.log('Original Hash:', originalHash);
    
    return currentHash === originalHash;
};

module.exports = { compareFileHash };






















// const fs = require('fs');
// const { sha3_256 } = require('js-sha3');

// // Function to compare the current file hash with the original hash
// function compareFileHash(filePath, originalHash) {
//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return;
//         }

//         // Generate SHA-3 hash for the file data
//         const currentHash = sha3_256(data);

//         console.log('Current File Hash:', currentHash);

//         // Compare the current hash with the original hash
//         if (currentHash === originalHash) {
//             console.log('The file is intact and has not been tampered with.');
//         } else {
//             console.log('The file has been tampered with!');
//         }
//     });
// }

// // Example usage for hash comparison
// // const filePath = 'Smallpdf-2024-08-11.pdf'; // Replace with your file path
// const filePath = '_10th.jpg'; // Replace with your file path
// // const originalHash = '0a2efd738fb923daa4d266665e5761d849aed060488e0480348682af4b9cfb27'; // Replace with the original hash
// const originalHash = '801a10a084d77efa7a8494857868f705790664a780e7cc508cbaa4d91d37569d'; // Replace with the original hash
// compareFileHash(filePath, originalHash);

