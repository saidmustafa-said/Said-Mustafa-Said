import os
import json

# Define the directory where your JSON files are stored
directory = "build/data/project/json/"
output_file = "build/data/project/timelinetotal.json"

# List to store merged and transformed JSON data
merged_data = []

# Loop through all JSON files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".json"):
        file_path = os.path.join(directory, filename)
        
        # Read the JSON data
        with open(file_path, 'r') as f:
            data = json.load(f)
            
            # Ensure 'id' is an integer and transform the data
            if isinstance(data, list):
                for item in data:
                    if "id" in item:
                        item["id"] = int(item["id"])
                    # Transform 'year' and 'month' to integers
                    if "year" in item:
                        item["year"] = int(item["year"])
                    if "month" in item:
                        item["month"] = int(item["month"])
                    # Transform the data as per the requirement
                    transformed_item = {
                        "id": item["id"],
                        "project_name": item["project_name"],
                        "description": item["description"],
                        "year": item["year"],
                        "month": item["month"],
                        "technologies_used": [tech["name"] for tech in item["technologies_used"]]
                    }
                    merged_data.append(transformed_item)
            elif isinstance(data, dict) and "id" in data:
                data["id"] = int(data["id"])
                # Transform 'year' and 'month' to integers
                if "year" in data:
                    data["year"] = int(data["year"])
                if "month" in data:
                    data["month"] = int(data["month"])
                # Transform the data as per the requirement
                transformed_item = {
                    "id": data["id"],
                    "project_name": data["project_name"],
                    "description": data["description"],
                    "year": data["year"],
                    "month": data["month"],
                    "technologies_used": [tech["name"] for tech in data["technologies_used"]]
                }
                merged_data.append(transformed_item)

# Sort the merged data by 'id' in descending order
merged_data.sort(key=lambda x: x["id"], reverse=True)

# Wrap the merged data in a dictionary with key 'timeline'
output_data = {"timeline": merged_data}

# Write the transformed merged data to the output file
with open(output_file, 'w') as f:
    json.dump(output_data, f, indent=4)

print(f"Merged and transformed JSON files into {output_file} in order of 'id' (descending) with 'timeline' key")
