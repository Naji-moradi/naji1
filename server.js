import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Initialize the Express app
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data (from form submissions)
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define the User schema
interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

// User registration route (CREATE)
app.post('/register', async (req: Request<{}, {}, { name: string; email: string; password: string }>, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  // Create JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  res.status(201).json({ token });
});

// User login route (LOGIN)
app.post('/login', async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  res.status(200).json({ token });
});

// Get all users (READ)
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
});

// Get a user by ID (READ)
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err.message });
  }
});

// Update a user by ID (UPDATE)
app.put('/users/:id', async (req: Request<{}, {}, { name?: string; email?: string; password?: string }>, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    // Hash password if it was provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

// Delete a user by ID (DELETE)
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send(); // No content to send
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 8000; // Use 8000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





















// // nodejs without type script

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Initialize the Express app
// const app = express();

// // Middleware to parse JSON data
// app.use(express.json());

// // Middleware to parse URL-encoded data (from form submissions)
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Create the User model
// const User = mongoose.model('User', userSchema);

// // User registration route (CREATE)
// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   // Check if user already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   // Hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // Create new user
//   const user = new User({ name, email, password: hashedPassword });
//   await user.save();

//   // Create JWT token
//   const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   res.status(201).json({ token });
// });

// // User login route (LOGIN)
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Check if user exists
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   // Validate password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   // Create JWT token
//   const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   res.status(200).json({ token });
// });

// // Get all users (READ)
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find().select('-password'); // Exclude password from response
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving users', error: err.message });
//   }
// });

// // Get a user by ID (READ)
// app.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password'); // Exclude password
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving user', error: err.message });
//   }
// });

// // Update a user by ID (UPDATE)
// app.put('/users/:id', async (req, res) => {
//   const { name, email, password } = req.body;
  
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;

//     // Hash password if it was provided
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     await user.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating user', error: err.message });
//   }
// });

// // Delete a user by ID (DELETE)
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(204).send(); // No content to send
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting user', error: err.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 8000; // Use 8000 if PORT is not set
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });









// child process



// const {exec,spawn} = require("child_process")



// exec("ls -l",(err, stdout,stderr)=>{
//   if(err){
//     console.err(`Error ${err.message}`)
//     return;
//   }
//   if(stderr){
//     console.error(`Stder ${stderr}`)
//     return;
//   }

//   console.log(`Stdout ${stdout}`)
// })







// const name = 'Akhtar';
// exec(`python3 script.py ${name}`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`Stderr: ${stderr}`);
//     return;
//   }
//   console.log(`Output from exec: \n${stdout}`); // Outputs: Hello, Akhtar!
// });




// const pythonProcess = spawn('python3', ['script.py', name]);

// // Handle output data from the Python script
// pythonProcess.stdout.on('data', (data) => {
//     console.log(`Output: from spawn ${data}`);
// });


// // hanle any python error from python script

// pythonProcess.stderr.on('data',(data)=>{
//   console.log(`Error in stderr ${data}`)
// })


// pythonProcess.on('exit', (code)=>{
//   console.log(`Exit the process withe code ${code}`)
// })




// const host = 'tawwana.com'
// const {ping} = require('./pingTask')

// ping(host,(err, result)=>{
//   if(err){
//     console.log(`Error occured`)
//     return;
//   }

//   console.log(`The result for the request is ${result}`)
// })

















// Fs module system



// const fs = require('fs');

// // Read the file 'example.txt'
// fs.readFile('./example.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
//   console.log('File content:', data);
// });


// // Write file with asyncronos method
// fs.writeFile('example.txt',"this is new content will be added to the old one",(err)=>{
//   if(err){
//     console.log("The error occured her")
//     return;
//   }
//   console.log("the file has ben added to dontent")
// })


// // copy the file from one to another

// // fs.copyFile('example.txt', 'example1.txt', (err) => {
// //   if (err) {
// //     console.error('Error copying the file:', err);
// //     return;
// //   }
// //   console.log('File was copied successfully!');
// // });


// try {
//   fs.copyFileSync("example.txt","example1.txt")
//   console.log("the file copyed sucessfllyyyyy")
  
// } catch (error) {
//   console.log("Error occured",error)
  
// }

// // fs.unlink("example1.txt", (err) =>{
// //   if(err){
// //     console.log("the file is not deleted ")
// //   }
// //   console.log("the file has been deleted succesfully ")

// // })




