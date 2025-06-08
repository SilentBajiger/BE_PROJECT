print("10%")

from inference_sdk import InferenceHTTPClient
print("20%")

try:
    client = InferenceHTTPClient(
        api_url="http://localhost:9001",  # Local inference server
        api_key="76vEue1fsM43gjdXreWh"    # Typically a dummy key for local
    )
    print("Client initialized:", client)
    print("30%")

    result = client.run_workflow(
        workspace_name="teja-er0xe",
        workflow_id="custom-workflow-2",
        images={
            "image": "tejas_12th.jpeg"
        },
        timeout=30  # in seconds
    )

    print("40%")

    print("Workflow result:", result)

except Exception as e:
    print("❌ Error:", e)
