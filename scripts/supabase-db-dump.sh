#!/bin/bash

source .env

if [ -z "$SUPABASE_DB_PASSWORD" ]; then
    echo "❌ Error: SUPABASE_DB_PASSWORD is not set in .env file"
    exit 1
fi

MIGRATIONS_PATH="supabase/migrations"
BACKUP_PATH="$MIGRATIONS_PATH/backup"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_PATH"

# Move all files except the latest one to backup
echo "🔄 Moving old migrations schema files to $BACKUP_PATH"
find "$MIGRATIONS_PATH" -maxdepth 1 -name "*_remote_schema.sql" -not -name "$(basename "$OUTPUT_FILE")" -exec mv {} "$BACKUP_PATH/" \;

TIMESTAMP=$(date +%Y%m%d%H%M%S)
OUTPUT_FILE="$MIGRATIONS_PATH/${TIMESTAMP}_remote_schema.sql"

npx supabase db dump --password "$SUPABASE_DB_PASSWORD" > "$OUTPUT_FILE"

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to dump database schema"
    exit 1
fi

echo "🎉 Database schema dumped successfully to $OUTPUT_FILE"