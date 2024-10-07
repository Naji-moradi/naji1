import express,{ Request, Response }  from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Initialize the Express app
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Define a User interface
interface IUser extends Document {
  name: string;
  email: string;
}

// Define a User schema
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

// Connect to MongoDB
const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// User registration route (CREATE)
app.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create new user
    const user = new User({ name, email });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to the database when starting the server
connectToDatabase();
