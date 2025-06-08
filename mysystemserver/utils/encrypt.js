const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const ivLength = 12; // IV length for GCM mode
const saltLength = 16; // Salt length for key derivation
const keyLength = 32; // 256-bit AES key

/**
 * Derives a key from a password using PBKDF2
 * @param {string} password - User-provided password
 * @param {Buffer} salt - Random salt
 * @returns {Buffer} - Derived encryption key
 */
function deriveKey(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, keyLength, 'sha256');
}

/**
 * Encrypts a file buffer using AES-256-GCM
 * @param {Buffer} fileBuffer - File data to encrypt
 * @param {string} password - Password for encryption
 * @returns {Buffer} - Encrypted file data (salt + IV + authTag + encrypted data)
 */
function encryptDocument(fileBuffer, password) {
    const salt = crypto.randomBytes(saltLength);
    const key = deriveKey(password, salt);
    const iv = crypto.randomBytes(ivLength);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(fileBuffer);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    const authTag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, authTag, encryptedData]);
}

module.exports = { encryptDocument };









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

// // Encrypt Image
// function encryptImage(imagePath, password) {
//     const salt = crypto.randomBytes(saltLength); // Unique salt
//     const key = deriveKey(password, salt);       // Derive AES key
//     const iv = crypto.randomBytes(ivLength);    // Unique IV

//     // Read image data
//     const imageBuffer = fs.readFileSync(imagePath);

//     // Encrypt image data
//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     let encryptedData = cipher.update(imageBuffer);
//     encryptedData = Buffer.concat([encryptedData, cipher.final()]);

//     const authTag = cipher.getAuthTag(); // Integrity tag

//     // Save salt, IV, authTag, and encrypted data
//     const encryptedFile = Buffer.concat([salt, iv, authTag, encryptedData]);
//     fs.writeFileSync('encrypted_image.bin', encryptedFile);

//     console.log('Image successfully encrypted and saved as "encrypted_image.bin".');
// }

// // Usage
// encryptImage('img1.jpg', 'StrongPassword123!');

