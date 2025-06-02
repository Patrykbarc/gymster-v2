#!/bin/bash

source .env

DESTINATION_PATH="app/types/database.types.ts"

if [ -z "$PROJECT_REF" ]; then
    echo "Error: PROJECT_REF is not set in .env file"
    exit 1
fi

npx supabase gen types typescript --project-id $PROJECT_REF --schema public > $DESTINATION_PATH

echo "Database types generated successfully in $DESTINATION_PATH"
