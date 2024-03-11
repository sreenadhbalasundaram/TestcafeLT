const fs = require('fs');

// Read the content of the output.txt file
fs.readFile('output.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Regular expression pattern to match the sessionID
    const regex = /sessionID=([a-zA-Z0-9]+)/;
    // Extract the sessionID using the pattern
    const matches = data.match(regex);
    // Check if a match is found
    if (matches && matches.length > 1) {
        const sessionID = matches[1];
        console.log('Session ID:', sessionID);
    } else {
        console.log('Session ID not found in the file.');
    }
});
