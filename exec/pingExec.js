// Import the child_process module
const { exec } = require('child_process');

// Function to ping a host
function pingHost(host) {
    exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(`Output:\n${stdout}`);
    });
}

// Call the function
pingHost('google.com');
