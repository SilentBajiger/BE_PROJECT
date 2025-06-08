const Digilocker = require('../Models/Digilocker.js');
const axios = require('axios');
const FormData = require('form-data');

const regionalVerification = async (clientFile, ref_file) => {
  try {
    const refFileData = ref_file["data"];
    const refBuffer = Buffer.isBuffer(refFileData)
      ? refFileData
      : Buffer.from(refFileData.data || refFileData, 'base64');

    const formData = new FormData();

    formData.append('original', clientFile.buffer, {
      filename: clientFile.originalname,
      contentType: clientFile.mimetype,
    });

    formData.append('ref', refBuffer, {
      filename: 'ref.png',
      contentType: ref_file["content_type"], // <-- Don't stringify
    });

    const res_data = await axios.post('http://127.0.0.1:8000/upload', formData, {
      headers: formData.getHeaders(),
    });

    console.log("✅ Python response:", res_data.data);

    const {cosine_score , sift_score} = res_data.data;
    if(cosine_score < 85 ) {
        console.log(`cosine_score is ${cosine_score} & sift_score is ${sift_score}.. Document is not Verified`);
        return {
      status: 202,
      ...res_data.data,
      msg: `cosine_score is ${cosine_score} & sift_score is ${sift_score}.. Document is not Verified`,
    };
    }
        console.log(`cosine_score is ${cosine_score} & sift_score is ${sift_score}.. Document is Verified`);

    return {
      status: 200,
      msg: "Data Fetched Successfully From Digilocker",
      ...res_data.data
    };

  } catch (error) {
    console.log("❌ Error in Getting DataFrom Digilocker:", error?.message);
    return { status: 202, msg: "Error: " + error?.message };
  }
};

module.exports = regionalVerification;



































// const Digilocker = require('../Models/Digilocker.js');
// const axios = require('axios');
// const FormData = require('form-data');

// const regionalVerification = async (clientFile,ref_file) =>{
//     try {

//         // console.log(file);
//         // console.log(ref_file);
//         // or req.files.original[0]

//         // 2. File data from MongoDB (buffer stored as string or binary)
//         const refFileData = ref_file["data"]; // assuming buffer-like data

//         // Convert string to Buffer (if needed)
//         const refBuffer = Buffer.isBuffer(refFileData)
//         ? refFileData
//         : Buffer.from(refFileData.data || refFileData, 'base64'); // or 'utf8', depending on how it's stored

//         // Create FormData
//         const formData = new FormData();

//         // Append client file
//         formData.append('original', clientFile.buffer, {
//         filename: clientFile.originalname,
//         contentType: clientFile.mimetype,
//         });

//         formData.append('ref', refBuffer, {
//         filename: 'ref.png', 
//         contentType: ref_file["content_type"],
//         });
        
//         // Send to another server
//         // const res_data = await axios.post('http://127.0.0.1:8000/upload', formData, {
//         //     headers: formData.getHeaders(),
//         // });
        
//         // console.log(res_data);

//         fetch('http://localhost:8000/upload', {
//       method: 'POST',
//       body: formData
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         setCosine(data.cosine_score)
//         setSift(data.sift_score)
//       })
//       .catch(err => console.error(err));

//         console.log("Data Fetched Successfully From Digilocker.......");
//         return {status:200,msg:"Data Fetched Successfully From Digilocker" };
//     } catch (error) {
//         console.log("Error in Getting DataFrom Digilocker.===== " + error?.message);
//         return {status:202,msg:"There is an Error" + error?.message};
//     }
// }

// module.exports = regionalVerification;