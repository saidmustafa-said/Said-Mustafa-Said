import json
import os

# Define the expected structure as a reference.
expected_structure = {
    "id": int,
    "project_name": str,
    "description": str,
    "year": int,
    "month": int,
    "role": str,
    "project_type": str,
    "technologies_used": list,
    "infrastructure": list,
    "skills_required": list,
    "challenges_faced": list,
    "outcomes": list,
    "links": list
}

# Define required substructures and their types
expected_substructure = {
    "technologies_used": [{"name": str, "description": str}],
    "infrastructure": [{"name": str, "description": str, "steps": list}],
    "skills_required": [{"name": str, "description": str}],
    "challenges_faced": [{"name": str, "description": str}],
    "outcomes": [{"name": str, "description": str}],
    "links": [{"name": str, "url": str}],
}

def validate_structure(data, structure, parent_key="root"):
    """Validate if data matches the expected structure"""
    for key, expected_type in structure.items():
        if key not in data:
            print(f"ERROR: Missing key '{key}' in '{parent_key}'")
            return False
        if isinstance(expected_type, type):
            # Check if the expected type is a simple type like int, str, etc.
            if not isinstance(data[key], expected_type):
                print(f"ERROR: Key '{key}' in '{parent_key}' is of incorrect type: Expected {expected_type}, got {type(data[key])}")
                return False
        elif isinstance(expected_type, list):
            # Validate list structure (if it's a list of dicts with specific keys and types)
            if not isinstance(data[key], list):
                print(f"ERROR: Key '{key}' in '{parent_key}' is not a list. Got {type(data[key])}")
                return False
            # Check if the list contains dictionaries that match the expected substructure
            for i, item in enumerate(data[key]):
                if not isinstance(item, dict):
                    print(f"ERROR: Item {i} in list '{key}' of '{parent_key}' is not a dictionary. Got {type(item)}")
                    return False
                if not validate_structure(item, expected_type[0], f"{parent_key}.{key}[{i}]"):
                    return False
    return True

def check_json_files(directory):
    """Check all JSON files in the given directory"""
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            filepath = os.path.join(directory, filename)
            try:
                with open(filepath, 'r') as file:
                    data = json.load(file)
                    # First, check the top-level structure
                    if not validate_structure(data, expected_structure, f"File: {filename}"):
                        print(f"ERROR: Invalid structure in file: {filename}")
                    else:
                        # Check substructure validation for lists like "technologies_used", "infrastructure", etc.
                        for key, substructure in expected_substructure.items():
                            if key in data:
                                if not validate_structure(data[key], substructure, f"File: {filename} > {key}"):
                                    print(f"ERROR: Invalid substructure in '{key}' in file: {filename}")
                            else:
                                print(f"ERROR: Missing '{key}' in file: {filename}")
            except json.JSONDecodeError:
                print(f"ERROR: Error decoding JSON in file: {filename}. The file may not be valid JSON.")
            except Exception as e:
                print(f"ERROR: Unexpected error processing file {filename}: {str(e)}")

# Specify the directory containing the JSON files to check
directory_path = "public/data/project/json/"  # Replace with your directory path
check_json_files(directory_path)
