const mindee = require("mindee");
// for TS or modules:
// import * as mindee from "mindee";

// Init a new client
const mindeeClient = new mindee.Client({ apiKey: "b240fc63eb79d109ed6b27d1ae6b9ac9" });

// Load a file from disk
const inputSource = mindeeClient.docFromPath("/path/to/the/file.ext");

// Create a custom endpoint for your product
const customEndpoint = mindeeClient.createEndpoint(
  "hsc_marksheet",
  "SurajF",
  "1" // Defaults to "1"
);

// Parse the file asynchronously.
const asyncApiResponse = mindeeClient.enqueueAndParse(
  mindee.product.GeneratedV1,
  inputSource,
  { endpoint: customEndpoint }
);

// Handle the response Promise
asyncApiResponse.then((resp) => {
  // print a string summary
  console.log(resp.document.toString());
});