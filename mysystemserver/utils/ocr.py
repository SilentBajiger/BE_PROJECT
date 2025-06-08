#
# Install the Python client library by running:
# pip install mindee
#

from mindee import Client, AsyncPredictResponse, product

# Init a new client
mindee_client = Client(api_key="b240fc63eb79d109ed6b27d1ae6b9ac9")

# Add the corresponding endpoint (document).
# Set the account_name to "mindee" if you are using OTS.
my_endpoint = mindee_client.create_endpoint(
    account_name="SurajF",
    endpoint_name="hsc_marksheet",
    version="1"
)

# Load a file from disk
input_doc = mindee_client.source_from_path("IMG20250502155237.jpg")

# Parse the file.
# The endpoint must be specified since it cannot be determined from the class.
result: AsyncPredictResponse = mindee_client.enqueue_and_parse(
    product.GeneratedV1,
    input_doc,
    endpoint=my_endpoint
)

# Print a brief summary of the parsed data
#print(result.document)

# Iterate over all the fields in the document
for field_name, field_values in result.document.inference.prediction.fields.items():
    print(field_name, "=", field_values)