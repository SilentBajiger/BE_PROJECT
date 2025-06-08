const { google } = require('googleapis');
const stream = require('stream'); // Import stream module
const fs = require('fs');

// Define your Google Drive folder ID
const FOLDER_ID = '1zsVQ_Uz2eOnHhMsYJ29S0l66_G8sFj4V'; // Replace with your actual folder ID

// Your credentials for Google Drive API (Service Account JSON file)
const apikeys = require('./apikeys.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

// Function to authenticate with Google Drive API
async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();
    return jwtClient;
}

// Function to upload the decoded file to Google Drive
async function uploadBase64File(authClient, fileData, fileName, mimeType) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    // Decode the base64 file data and create a buffer
    const buffer = Buffer.from(fileData, 'base64');

    // Create a readable stream from the buffer
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer); // Pass the buffer to the stream

    const fileMetadata = {
        name: fileName,
        parents: [FOLDER_ID], // The folder ID where the file will be uploaded
    };

    const media = {
        mimeType: mimeType,
        body: bufferStream, // Pass the stream to the Google Drive upload
    };

    // Upload the file
    try {
        const file = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });


        return file.data.id; // Return the file ID
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file to Google Drive');
    }
}

// File upload controller
const fileUploadController = async (req, res) => {
    try {
        console.log("FILE UPLAOD CONTROLLER")
        const { fileData, fileName, type } = req.body;
        console.log("10%")

        // return res.status(200).json({
        //     msg: "File uploaded successfully!",
        //     url: "www.fakeurl13241345.com", // URL of the uploaded file
        //     fileName,
        //     status:200,
        // });



        if (!fileData || !fileName || !type) {
            return res.status(400).json({ error: 'Missing file data or file metadata' });
        }

        // Authenticate with Google Drive API
        const auth = await authorize();
        console.log("30%")

        // Upload the file to Google Drive and get the file ID
        const fileId = await uploadBase64File(auth, fileData, fileName, type);
        console.log("50%")

        // Generate the file URL
        const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
        console.log("100%")

        return res.status(200).json({
            msg: "File uploaded successfully!",
            url: fileUrl, // URL of the uploaded file
            fileName,
            status:200,
        });

    } catch (error) {
        console.error("Error in fileUploadController:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { fileUploadController };
