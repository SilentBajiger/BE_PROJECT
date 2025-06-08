print("10%")

from inference_sdk import InferenceHTTPClient
print("20%")

try:
    client = InferenceHTTPClient(
        api_url="http://localhost:9001", # use local inference server
        api_key="76vEue1fsM43gjdXreWh"
    )
    print(client)
    print("30%")

    result = client.run_workflow(
        workspace_name="teja-er0xe",
        workflow_id="custom-workflow-2",
        images={
            "image": "tejas_12th.jpeg"
        }
    )
    print("40%")

    print(result)
except BaseException as e:
    print(e)