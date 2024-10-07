const { exec} = require('child_process')



exec('ls -l', (error,stdout,stderr)=>{


    if(error){
        console.error(`Erorr ${error}`)

        return;
    }


    if(stderr){
        console.error(`Stderr ${stderr}`);
        return;

    }

    console.log(`Output is ${stdout}`)

})



// const {exec} = require('child_process')

// // Use exec to run the 'ls -l' shell command
// exec('ls -l', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error: ${error.message}`);
//         return;
//     }

//     if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         return;
//     }

//     console.log(`Output:\n${stdout}`);
// });
