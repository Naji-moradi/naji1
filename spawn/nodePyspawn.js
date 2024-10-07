

const {spawn}= require('child_process')

// Arguments to pass to the Python script
const a = 5;
const b = 3;

// Spawn a new Python process
const pythonProcess = spawn('python3', ['pySpawn.py', a, b]);

// Capture the output from the Python script
pythonProcess.stdout.on('data', (data) => {
  console.log(`Output from Python script: ${data.toString()}`);
});

// Handle any errors
pythonProcess.stderr.on('data', (data) => {
  console.error(`Error: ${data.toString()}`);
});

// Handle process exit
pythonProcess.on('close', (code) => {
  console.log(`Python script finished with exit code ${code}`);
});
