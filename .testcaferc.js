// Import the 'os' module
let os = require("os");

// Set environment variables
//process.env.LT_BUILD = 'Build'; // setting the build name(we can do it from browser.js file so commenting this out)
process.env.LT_CAPABILITY_PATH = "test/browser.json"; // setting up capabilities


// Export TestCafe configuration
module.exports = {
    src: "test/testwithcurl.js", // Tests
    browsers: ["lambdatest:Chrome@74.0:Windows 8"], // Browsers
    skipJsErrors: true // Skip JavaScript errors
};




// Run command for this will be:  testcafe "test/testwithcurl.js" --config-file .testcaferc.js > output.txt
// Using this we will be able to dynamically select the js file that we want to run

