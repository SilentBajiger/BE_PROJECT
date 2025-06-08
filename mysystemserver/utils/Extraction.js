const mindee = require("mindee");

const mindeeClient = new mindee.Client({ apiKey: "b240fc63eb79d109ed6b27d1ae6b9ac9" });

const Extraction = async (file) => {
  try {
    if (!file || !file.buffer || !file.originalname) {
      return {status:202,msg:"Some Fields are not available"};
      // throw new Error("Invalid file input");
    }
    console.log("30%")

    const inputSource = mindeeClient.docFromBuffer(file.buffer, file.originalname);
    console.log("40%")

    const customEndpoint = mindeeClient.createEndpoint(
      "hsc_marksheet", // your model name
      "SurajF",          // your Mindee account name
      "1"                // version
    );
    console.log("50%")

    const asyncApiResponse = await mindeeClient.enqueueAndParse(
      mindee.product.GeneratedV1,
      inputSource,
      { endpoint: customEndpoint }
    );
    console.log("100%")

    return {status:200,msg:"Extraction successfull",fields:asyncApiResponse.document.inference.prediction?.fields};
  } catch (error) {
    console.error("Mindee Extraction Error:", error.message);
    return {status:202,msg:`Internal Server Error in Extraction : ${error?.message}`};
    // throw error;
  }
};

module.exports = Extraction;




































// const axios = require("axios");
// const FormData = require("form-data");

// const MINDEE_API_KEY = "b240fc63eb79d109ed6b27d1ae6b9ac9";

// const Extraction = async (file) => {
//   try {
//     const form = new FormData();
//     form.append("document", file.buffer, file.originalname);

//     const enqueueRes = await axios.post(
//       "https://api.mindee.net/v1/products/SurajF/hsc_marksheet/v1/predict_async",
//       form,
//       {
//         headers: {
//           ...form.getHeaders(),
//           Authorization: `Token b240fc63eb79d109ed6b27d1ae6b9ac9`,
//           Accept: "application/json"
//         }
//       }
//     );

//     const pollingUrl = enqueueRes.data?.job?.polling_url;
//     if (!pollingUrl) throw new Error("Polling URL not found in Mindee response");

//     console.log("Polling URL:", pollingUrl);

//     let result;
//     const MAX_ATTEMPTS = 10;
//     for (let attempts = 0; attempts < MAX_ATTEMPTS; attempts++) {
//       await new Promise(r => setTimeout(r, 2000));

//       const pollRes = await axios.get(pollingUrl, {
//         headers: {
//           Authorization: `Token ${MINDEE_API_KEY}`
//         }
//       });

//       const status = pollRes.data.api_request.status;
//       console.log(`Polling attempt ${attempts + 1}: ${status}`);

//       if (status === "completed") {
//         result = pollRes.data;
//         break;
//       }
//     }

//     if (!result) throw new Error("Mindee Extraction Timed Out");

//     const fields = result.document?.inference?.prediction?.fields;
//     if (!fields) throw new Error("No fields found in Mindee response");

//     const extracted = {};
//     for (const [key, value] of Object.entries(fields)) {
//       extracted[key] = value.value;
//     }

//     return extracted;
//   } catch (error) {
//     console.error("Extraction failed:", error.response?.data || error.message);
//     throw new Error(`Mindee Extraction Failed: ${error.message}`);
//   }
// };

// module.exports = Extraction;




































































// const axios = require("axios");
// const FormData = require("form-data");

// const MINDEE_API_KEY = "b240fc63eb79d109ed6b27d1ae6b9ac9";

// const Extraction = async (file) => {
//   try {
//     // Step 1: Create form data with the uploaded file buffer
//     const form = new FormData();
//     form.append("document", file.buffer, file.originalname);

//     // Step 2: Enqueue the document using async endpoint
//     const enqueueRes = await axios.post(
//       "https://api.mindee.net/v1/products/SurajF/hsc_marksheet/v1/predict_async",
//       form,
//       {
//         headers: {
//           ...form.getHeaders(),
//           Authorization: `Token ${MINDEE_API_KEY}`
//         }
//       }
//     );
//     console.log("------------------------------------------------------------------")
//     console.log(enqueueRes)
//     console.log("------------------------------------------------------------------")

//     const pollingUrl = enqueueRes.data?.job?.polling_url;
//     if (!pollingUrl) throw new Error("Polling URL not found in Mindee response");

//     let result;
//     let attempts = 0;
//     while (attempts < 10) {
//       await new Promise((r) => setTimeout(r, 2000)); // wait 2s

//       const pollRes = await axios.get(pollingUrl, {
//         headers: {
//           Authorization: `Token ${MINDEE_API_KEY}`
//         }
//       });

//       if (pollRes.data.api_request.status === "completed") {
//         result = pollRes.data;
//         break;
//       }

//       attempts++;
//     }

//     if (!result) throw new Error("Mindee Extraction Timed Out");

//     // Step 4: Extract fields
//     const fields = result.document?.inference?.prediction?.fields;
//     if (!fields) throw new Error("No fields found in Mindee response");

//     const extracted = {};
//     for (const [key, value] of Object.entries(fields)) {
//       extracted[key] = value.value;
//     }


//     return extracted;
//   } catch (error) {
//     console.error("Extraction failed:", error);
//     throw new Error("Mindee Extraction Failed");
//   }
// };

// module.exports = Extraction;






















// const mindee = require("mindee");

// const mindeeClient = new mindee.Client({ apiKey: "b240fc63eb79d109ed6b27d1ae6b9ac9" });


// const Extraction = async (file) => {
//     try {
//         console.log("Started----------- 10%")
//         const inputSource = mindeeClient.docFromPath("IMG20250502155237.jpg");
//         // const inputSource = mindeeClient.docFromPath(path.join(__dirname, "IMG20250502155237.jpg"));
//         const customEndpoint = mindeeClient.createEndpoint(
//             "hsc_marksheet",
//             "SurajF",
//             "1" // Defaults to "1"
//         );
//         console.log("Started----------- 30%")

//         const asyncApiResponse = mindeeClient.enqueueAndParse(
//             mindee.product.GeneratedV1,
//             inputSource,
//             { endpoint: customEndpoint }
//         );
//         console.log("Started----------- 60%")
        
//         asyncApiResponse.then((resp) => {
//             console.log(resp.document.toString());
//         });
//         console.log("Started----------- 100%")

//         return 4;
//     } catch (error) {
//         console.log("Error:",error.message);
//         return 10;
//     }
// }

// module.exports = Extraction;