const {spawn} = require('child_process')



function pinsSpawn(host){
    const ping = spawn('ping',['-c','4',host]);
    

    ping.stdout.on('data',(data)=>{
        console.log(`Stdoutput is ${data}`);
    })

    ping.stderr.on('data',(data)=>{
        console.log(`Stderr is : ${data}`)
    })

    ping.on("close",(code)=>{
        console.log(`The ping got exited with the code ${code}`)
    })
}

pinsSpawn('google.com')


// // Import the child_process module
// const { spawn } = require('child_process');

// // Function to ping a host
// function pingHost(host) {
//     const ping = spawn('ping', ['-c', '4', host]); // Use '-n' for Windows

//     // Listen for data from stdout
//     ping.stdout.on('data', (data) => {
//         console.log(`Output: ${data}`);
//     });

//     // Listen for errors
//     ping.stderr.on('data', (data) => {
//         console.error(`Error: ${data}`);
//     });

//     // Listen for when the process exits
//     ping.on('close', (code) => {
//         console.log(`Ping process exited with code: ${code}`);
//     });
// }

// // Call the function
// pingHost('google.com');
