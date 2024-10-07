var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Types } from 'mongoose';
// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});
// User Model
const User = mongoose.model('User', userSchema);
const app = express();
const port = 3000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabase')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Middleware
app.use(bodyParser.json());
// CRUD Operations
// Create a new user
app.post('/users', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
    });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: 'Error creating user' }));
});
// Read all users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
}));
// Get a user by ID
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate ObjectId
        if (!Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        const user = yield User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching user' });
    }
}));
// Update a user by ID
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate ObjectId
        if (!Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        const updatedUser = yield User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: 'Error updating user' });
    }
}));
// Delete a user by ID
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate ObjectId
        if (!Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        const deletedUser = yield User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting user' });
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
