// pingTask.js

const { exec } = require('child_process');

// Function to ping a host
function ping(host, callback) {
    exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
        if (error) {
            callback(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            callback(`Stderr: ${stderr}`);
            return;
        }
        callback(null, stdout);  // Return the result via callback
    });
}

// Export the ping function to be used in other files
module.exports = { ping };
