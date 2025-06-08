const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const saltLength = 16;
const ivLength = 12;
const authTagLength = 16;
const keyLength = 32;

/**
 * Derives an encryption key from a password and salt
 * @param {string} password - The password used for encryption
 * @param {Buffer} salt - The salt stored in the encrypted file
 * @returns {Buffer} - Derived key
 */
function deriveKey(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, keyLength, 'sha256');
}

/**
 * Decrypts an encrypted Buffer
 * @param {Buffer} encryptedBuffer - The buffer containing encrypted data
 * @param {string} password - The password for decryption
 * @returns {Buffer} - Decrypted file data
 */
function decryptFile(encryptedBuffer, password) {
    try {
        // Extract salt, IV, auth tag, and encrypted data
        const salt = encryptedBuffer.slice(0, saltLength);
        const iv = encryptedBuffer.slice(saltLength, saltLength + ivLength);
        const authTag = encryptedBuffer.slice(saltLength + ivLength, saltLength + ivLength + authTagLength);
        const encryptedData = encryptedBuffer.slice(saltLength + ivLength + authTagLength);

        // Derive key using PBKDF2
        const key = deriveKey(password, salt);

        // Create AES-GCM decipher
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        decipher.setAuthTag(authTag);

        // Decrypt data
        let decryptedData = decipher.update(encryptedData);
        decryptedData = Buffer.concat([decryptedData, decipher.final()]);

        return {status:200,decryptedData:decryptedData,msg:"File Decrypted Successfully..."};
    } catch (error) {
        console.error("Decryption Error:", error);
        return {status:400,decryptedData:null,msg:"File Decryption Failed..."};
        // throw new Error("Failed to decrypt file");
    }
}

module.exports = { decryptFile };














// const fs = require('fs');
// const crypto = require('crypto');

// // AES-GCM Configuration
// const algorithm = 'aes-256-gcm';
// const ivLength = 12; // IV length for GCM mode
// const saltLength = 16; // Salt length for key derivation
// const keyLength = 32; // 256-bit AES key

// /**
//  * Derives a key from a password using PBKDF2
//  * @param {string} password - User-provided password
//  * @param {Buffer} salt - Random salt
//  */
// function deriveKey(password, salt) {
//     return crypto.pbkdf2Sync(password, salt, 100000, keyLength, 'sha256');
// }

// // Decrypt Image
// function decryptImage(encryptedFilePath, password) {
//     const encryptedBuffer = fs.readFileSync(encryptedFilePath);

//     // Extract salt, IV, authTag, and encrypted data
//     const salt = encryptedBuffer.slice(0, saltLength);
//     const iv = encryptedBuffer.slice(saltLength, saltLength + ivLength);
//     const authTag = encryptedBuffer.slice(saltLength + ivLength, saltLength + ivLength + 16);
//     const encryptedData = encryptedBuffer.slice(saltLength + ivLength + 16);

//     // Derive AES key
//     const key = deriveKey(password, salt);

//     // Decrypt image data
//     const decipher = crypto.createDecipheriv(algorithm, key, iv);
//     decipher.setAuthTag(authTag);

//     let decryptedData = decipher.update(encryptedData);
//     decryptedData = Buffer.concat([decryptedData, decipher.final()]);

//     // Save decrypted image
//     fs.writeFileSync('decrypted_image.jpg', decryptedData);

//     console.log('Image successfully decrypted and saved as "decrypted_image.jpg".');
// }

// // Usage
// decryptImage('encrypted_image.bin', 'StrongPassword123!');


