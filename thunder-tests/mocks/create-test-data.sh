#!/bin/bash

createCategory() {
  categoryName="$1"
  testDataFile="test-data.json"

  if [ -z "$categoryName" ]; then
    echo "Error: categoryName argument is required"
    exit 1
  fi

  # Find the category object in the JSON file
  categoryObj=$(jq -r --arg categoryName "$categoryName" '.categories[] | select(.name == $categoryName)' "$testDataFile")

  if [ -z "$categoryObj" ]; then
    echo "Error: Category not found"
    exit 1
  fi

  # Extract name and description from the category object
  name=$(echo "$categoryObj" | jq -r '.name')
  description=$(echo "$categoryObj" | jq -r '.description')

  # Prepare JSON payload for the POST request
  jsonPayload=$(jq -n --arg name "$name" --arg description "$description" '{name: $name, description: $description}')

  # Make the POST request and store the response
  response=$(curl -s -X POST -H "Content-Type: application/json" -d "$jsonPayload" "http://localhost/api/v1/ims/categories")

  # Extract and print the id from the response
  id=$(echo "$response" | jq -r '.id')
  echo "Category created with ID: $id"
}

createProducts() {
  categoryName="$1"
  categoryId="$2"
  testDataFile="test-data.json"

  if [ -z "$categoryName" ] || [ -z "$categoryId" ]; then
    echo "Error: Both categoryName and categoryId arguments are required"
    exit 1
  fi

  # Find the category object in the JSON file
  categoryObj=$(jq -r --arg categoryName "$categoryName" '.categories[] | select(.name == $categoryName)' "$testDataFile")

  if [ -z "$categoryObj" ]; then
    echo "Error: Category not found"
    exit 1
  fi

  # Loop through items in the category
  itemsLength=$(echo "$categoryObj" | jq -r '.items | length')
  for ((i=0; i<$itemsLength; i++)); do
    # Extract item data
    item=$(echo "$categoryObj" | jq -r ".items[$i]")
    itemName=$(echo "$item" | jq -r '.name')
    itemDescription=$(echo "$item" | jq -r '.description')
    itemPrice=$(echo "$item" | jq -r '.price')
    itemStock=$(echo "$item" | jq -r '.stock')

    # Prepare JSON payload for the POST request
    jsonPayload=$(jq -n --arg name "$itemName" --arg description "$itemDescription" --arg categoryId "$categoryId" --argjson price "$itemPrice" --argjson stock "$itemStock" '{name: $name, description: $description, price: $price, stock: $stock, categoriesIds: [$categoryId]}')

    # Make the POST request and store the response
    response=$(curl -s -X POST -H "Content-Type: application/json" -d "$jsonPayload" "http://localhost/api/v1/ims/products")

    # Extract and print the id from the response
    id=$(echo "$response" | jq -r '.id')
    echo "Product created with ID: $id"
  done
}



command="$1"
shift

case "$command" in
  createCategory)
    createCategory "$@"
    ;;
  createProducts)
    createProducts "$@"
    ;;
  *)
    echo "Error: Invalid command. Available commands: createCategory, createProducts"
    exit 1
    ;;
esac
