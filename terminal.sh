#!/bin/bash

testcafe --config-file .testcaferc.js > output.txt 2>&1

# File containing the terminal output
FILE_PATH="output.txt"

# Extracting the sessionId value
sessionId=$(grep -o 'sessionID=[^ ]*' "$FILE_PATH" | awk -F '=' '{print $2}')

# Printing the sessionId
echo "Session ID: $sessionId"

# api call to upload terminal logs to LT
curl -X POST "https://api.lambdatest.com/automation/api/v1/sessions/${sessionId}/terminal-logs" -H "accept: application/json" -H "Authorization: Basic c3JlZW5hZGhiOkkzMDRwbGFDcEJ4cEVSdkg1cm9KNnZGdVdxTGY0bG9rU0p2MkJiMUp2Z0lGMHBqcWJI" -H "Content-Type: multipart/form-data" -F "file=@output.txt;type=text/plain"

