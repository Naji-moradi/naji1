import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Types } from 'mongoose';

// Interface for User data
interface User {
  name: string;
  email: string;
}

// User Schema
const userSchema = new mongoose.Schema<User>({
  name: String,
  email: String,
});

// User Model
const User = mongoose.model<User>('User', userSchema);

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
app.post('/users', (req: express.Request, res: express.Response) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ error: 'Error creating user' }));
});

// Read all users
app.get('/users', async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get a user by ID
app.get('/users/:id', async (req: express.Request, res: express.Response):Promise<any> => {
  try {
    // Validate ObjectId
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Update a user by ID
app.put('/users/:id', async (req: express.Request, res: express.Response):Promise<any> => {
  try {
    // Validate ObjectId
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req: express.Request, res: express.Response):Promise<any> => {
    try {
      // Validate ObjectId
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
      }
  
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
