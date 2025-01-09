const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 5000;
// const admin = require('firebase-admin');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  personalDetails: {
    name: String,
    age: Number,
    height: Number,
    weight: Number,
    emergencyContact1: String,
    emergencyContact2: String,
  },
});

const User = mongoose.model('User', userSchema);

// const serviceAccount = require('./medicine-reminder-a5169-firebase-adminsdk-yukw6-2edbf2d01f.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // API endpoint to send notifications
// app.post('/send-notification', async (req, res) => {
//   const { token, title, body, image } = req.body;

//   try {
//     const message = {
//       notification: {
//         title,
//         body,
//       },
//       data: {
//         image,
//       },
//       token,
//     };

//     await admin.messaging().send(message);
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error('Error sending notification:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// Routes
app.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
);

app.get('/api/user-details', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.personalDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details', error });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});


app.post('/api/save-details', async (req, res) => {
  const { email, name, age, height, weight, emergencyContact1, emergencyContact2 } = req.body;

  // Log incoming request data
  console.log('Incoming Request:', req.body);

  // Check for missing fields
  if (!email || !name || !age || !height || !weight || !emergencyContact1 || !emergencyContact2) {
    console.error('Missing required fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check database connection
    console.log('MongoDB Connection State:', mongoose.connection.readyState); // Should be 1 (connected)

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    // Update personal details
    console.log('User found:', user);
    user.personalDetails = { name, age, height, weight, emergencyContact1, emergencyContact2 };
    await user.save();

    console.log('Updated User Details:', user.personalDetails);
    res.status(200).json({ message: 'Details saved successfully', user });
  } catch (error) {
    console.error('Error saving details:', error.message);
    res.status(500).json({ message: 'Error saving details', error: error.message });
  }
});

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Associate reminders with a user
  medicineName: { type: String, required: true },
  medicineDescription: { type: String, default: '' },
  image: { type: String, default: null },
  time: { type: Date, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  taken: { type: Boolean, default: false },
  skipped: { type: Boolean, default: false },
  frequency: { type: String, default: 'daily' },
  numberOfMedications: { type: Number, default: 1 },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// History Schema
const historySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Associate history with a user
  medicineName: { type: String, required: true },
  medicineDescription: { type: String, default: '' },
  image: { type: String, default: null },
  time: { type: Date, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  taken: { type: Boolean, default: false },
  skipped: { type: Boolean, default: false },
  frequency: { type: String, default: 'daily' },
  numberOfMedications: { type: Number, default: 1 },
});

const History = mongoose.model('History', historySchema);

// Routes for Reminders
// Create a new reminder
app.post('/api/reminders', async (req, res) => {
  const { userId, medicineName, medicineDescription, image, time, startDate, endDate, frequency, numberOfMedications } = req.body;

  if (!userId || !medicineName || !time || !startDate || !endDate) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const newReminder = new Reminder({
      userId,
      medicineName,
      medicineDescription,
      image,
      time: new Date(time),
      startDate,
      endDate,
      frequency,
      numberOfMedications,
    });

    await newReminder.save();
    res.status(201).json({ message: 'Reminder created successfully', reminder: newReminder });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({ message: 'Error creating reminder', error });
  }
});

// Get all reminders for a user
app.get('/api/reminders/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const reminders = await Reminder.find({ userId });
    res.status(200).json({ reminders });
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ message: 'Error fetching reminders', error });
  }
});

// Update a reminder
app.put('/api/reminders/:id', async (req, res) => {
  const { id } = req.params;
  const { medicineName, medicineDescription, image, time, startDate, endDate, frequency, numberOfMedications } = req.body;

  try {
    const updatedReminder = await Reminder.findByIdAndUpdate(
      id,
      {
        medicineName,
        medicineDescription,
        image,
        time: new Date(time),
        startDate,
        endDate,
        frequency,
        numberOfMedications,
      },
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.status(200).json({ message: 'Reminder updated successfully', reminder: updatedReminder });
  } catch (error) {
    console.error('Error updating reminder:', error);
    res.status(500).json({ message: 'Error updating reminder', error });
  }
});

// Delete a reminder
app.delete('/api/reminders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReminder = await Reminder.findByIdAndDelete(id);
    if (!deletedReminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({ message: 'Error deleting reminder', error });
  }
});

// Routes for History
// Move a reminder to history
app.post('/api/history', async (req, res) => {
  const { userId, reminderId, taken, skipped } = req.body;

  if (!userId || !reminderId || (taken === undefined && skipped === undefined)) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const reminder = await Reminder.findById(reminderId);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    const newHistory = new History({
      userId,
      ...reminder.toObject(),
      taken,
      skipped,
    });

    await newHistory.save();
    await Reminder.findByIdAndDelete(reminderId);

    res.status(201).json({ message: 'Reminder moved to history', history: newHistory });
  } catch (error) {
    console.error('Error moving reminder to history:', error);
    res.status(500).json({ message: 'Error moving reminder to history', error });
  }
});

// Get all history for a user
app.get('/api/history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await History.find({ userId });
    res.status(200).json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Error fetching history', error });
  }
});

// Delete a history entry
app.delete('/api/history/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHistory = await History.findByIdAndDelete(id);
    if (!deletedHistory) {
      return res.status(404).json({ message: 'History entry not found' });
    }

    res.status(200).json({ message: 'History entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting history entry:', error);
    res.status(500).json({ message: 'Error deleting history entry', error });
  }
});

// Delete all history for a user
app.delete('/api/history/all/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    await History.deleteMany({ userId });
    res.status(200).json({ message: 'All history deleted successfully' });
  } catch (error) {
    console.error('Error deleting all history:', error);
    res.status(500).json({ message: 'Error deleting all history', error });
  }
});

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});