// import { Network } from "inspector/promises"

// import wifi-node
const wifi = require("node-wifi")



wifi.init({
    iface:null,
})



wifi.scan((err:any,network:any)=>{


    if(err){
        console.error("Eror for wifi scan occured")
    }
    else{
        console.log("All th avaliable wifis are belwo",network)
    }

})




const ssid = "A"
const password = "naji1234"


wifi.connect({ssid,password},(err:any,network:any)=>{


    if(err){
        console.error("The error occured due to connect to  wifil",err)
    }
    else{
        console.log("The specific wifi is ",network)
    }

})




wifi.disconnect((err:any)=>{
    if(err){
        console.log("Ther is error in disconnecting wifi")
    }
    else{
        console.log("the wifi is disconnected succesfully ")
    }
})













// const wifi = require('node-wifi')

// // Initialize wifi
// wifi.init({
//   iface: null // Use default network interface
// });

// // Scan for available networks
// wifi.scan((err:any, networks:any) => {
//   if (err) {
//     console.error('Error scanning for networks:', err);
//   } else {
//     console.log('Available networks:', networks);
//   }
// });

// // Connect to a Wi-Fi network
// const ssid = 'A';
// const password = 'naji1234';

// wifi.connect({ ssid, password }, (err: any) => {
//   if (err) {
//     console.error('Error connecting to Wi-Fi:', err);
//   } else {
//     console.log('Successfully connected to Wi-Fi');
//   }
// });

// // Disconnect from the Wi-Fi network
// wifi.disconnect((err:any) => {
//   if (err) {
//     console.error('Error disconnecting from Wi-Fi:', err);
//   } else {
//     console.log('Disconnected from Wi-Fi');
//   }
// });
