import json
import os
from jsonschema import validate, ValidationError

# Load the proper JSON Schema
with open('public/data/project/schema.json', 'r') as schema_file:
    schema = json.load(schema_file)

# Validate each JSON file in a folder
folder = 'public/data/project/json/'
for filename in os.listdir(folder):
    if filename.endswith('.json'):
        with open(os.path.join(folder, filename), 'r') as json_file:
            data = json.load(json_file)
            try:
                validate(instance=data, schema=schema)
                print(f"{filename} is valid!")
            except ValidationError as e:
                print(f"{filename} is invalid: {e.message}")
