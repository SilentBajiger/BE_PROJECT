

const stringSimilarity = require('string-similarity');

const compareOcrData = async (digi_data, ocr_data) => {
  try {
    let extractedData = {};

    // Extract OCR data
    for (const [key, field] of ocr_data.entries()) {
      if (key === 'subject_grades' && field.values) {
        extractedData[key] = field.values.map((item) => ({
          subject: item.subject,
          grade: item.grade,
        }));
      } else {
        extractedData[key] = field.value;
      }
    }

    // console.log("EXTRACTED DATA:", JSON.stringify(extractedData));
    // console.log("DIGILOCKER DATA:", JSON.stringify(digi_data));

    // Helper to compare similarity
    function isSimilarEnough(a, b, threshold = 0.85) {
      const normA = (a ?? "").toString().trim().toLowerCase();
      const normB = (b ?? "").toString().trim().toLowerCase();
      return stringSimilarity.compareTwoStrings(normA, normB) >= threshold;
    }

    // Compare each field
    for (const key in extractedData) {
      if (key === "subject_grades") {
        for (const obj1 of digi_data[key]) {
          const match = extractedData[key].find(obj2 =>
            isSimilarEnough(obj2.subject, obj1.subject) &&
            isSimilarEnough(obj2.grade, obj1.grade)
          );
          if (!match) {
            console.log(`Data is not Matching for subject: ${JSON.stringify(obj1)}`);
            return {
              status: 202,
              msg: `Data is not Matching for subject: ${JSON.stringify(obj1)}`
            };
          }
        }
      } else {
        if (!isSimilarEnough(extractedData[key], digi_data[key])) {
          console.log(`Data is not Matching for key: ${key}, OCR: ${extractedData[key]}, DigiLocker: ${digi_data[key]}`);
          return {
            status: 202,
            msg: `Data is not Matching for key: ${key}, OCR: ${extractedData[key]}, DigiLocker: ${digi_data[key]}`
          };
        }
      }
    }

    console.log("Verified Successfully");
    return { status: 200, msg: "All Fields Matched" };

  } catch (error) {
    console.log(error);
    return { status: 202, msg: `Internal Error: ${error.message}` };
  }
};





















































// const compareOcrData = async(digi_data,ocr_data) =>{
//     try {
//         let extractedData = {}
//         // let extractedData = {"cert_id":"H211055484","mothers_name":"Manisha","name":"Fartale Suraj Milind","percentage":"93.17","roll_number":"P003845","subject_grades":[{"subject":"English","grade":"89"},{"subject":"Marathi","grade":"93"},{"subject":"Mathematics & Statistics","grade":"99"},{"subject":"Physics","grade":"94"},{"subject":"Chemistry","grade":"88"},{"subject":"Biology","grade":"96"},{"subject":"ENV. EDU. & WATER SECURITY","grade":"A"},{"subject":"HEALTH & PHYSICAL EDUCATION","grade":"A"}],"total_marks":"559"}
//         for (const [key, field] of ocr_data.entries()) {
//             if (key === 'subject_grades' && field.values) {
//             extractedData[key] = field.values.map((item) => new Object({subject:item.subject,grade:item.grade}));
//             field.values?.forEach((item) => {
//                 console.log(JSON.stringify(item))
//             });
//             } else {
//             extractedData[key] = field.value;
//             }
//         }
//         console.log("EXTRACTED DATA : ",JSON.stringify(extractedData));
//         console.log("DIGILOCKER DATA : ",JSON.stringify(digi_data));
//         function isEqualNormalized(a, b) {
//             const normA = (a ?? "").toString().trim().toLowerCase();
//             const normB = (b ?? "").toString().trim().toLowerCase();
//             return normA === normB;
//           }
//         for(const key in extractedData){
//             if(key === "subject_grades"){
//                 for(const obj1 of digi_data[key]){
//                     // const match = extractedData[key].find(obj2 => obj2.subject === obj1.subject && obj2.grade === obj1.grade)
//                     const match = extractedData[key].find(obj2 => isEqualNormalized(obj2.subject,obj1.subject) && isEqualNormalized(obj2.grade,obj1.grade))
//                     if(!match){
//                         console.log(`Data is not Matching of subject : ${JSON.stringify(obj1)}`)
//                         return {status:202,msg:`Data is not Matching of subject : ${JSON.stringify(obj1)} `}
//                     }
//                 }
//             }
//             else{
//                 if(!isEqualNormalized(extractedData[key], digi_data[key])){
//                     console.log(`Data is not Matching of key : ${key} with val: ${extractedData[key]} & ${digi_data[key]}`);
//                     return {status:202,msg:`Data is not Matching of key : ${key} with val: ${extractedData[key]} & ${digi_data[key]}`}
//                 }
//             }
//         }
//         console.log("Verified SuccessFully");
//         return {status:200,msg:"All Fields are Matched"};

//     } catch (error) {
//         console.log(error);
//         return {status:202,msg:`Internal Error : ${error.message}`};
//     }
// }
module.exports = compareOcrData;