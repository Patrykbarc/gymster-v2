#!/bin/bash

source .env

DESTINATION_PATH="app/types/database.types.ts"

if [ -z "$SUPABASE_PROJECT_REF" ]; then
    echo "Error: SUPABASE_PROJECT_REF is not set in .env file"
    exit 1
fi

npx -y supabase gen types typescript --project-id $SUPABASE_PROJECT_REF --schema public > $DESTINATION_PATH

echo "Database types generated successfully in $DESTINATION_PATH"