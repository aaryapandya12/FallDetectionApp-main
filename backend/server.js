// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://aaryapandya611:mlT3Hnl6Vgn4Hj4i@cluster0.rci4c.mongodb.net', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   email: String,
//   username: String,
//   password: String,
//   personalDetails: {
//     name: String,
//     age: Number,
//     height: Number,
//     weight: Number,
//     emergencyContact1: String,
//     emergencyContact2: String,
//   },
// });

// const User = mongoose.model('User', userSchema);

// // Routes
// // app.post('/register', async (req, res) => {
// //   const { email, username, password } = req.body;

// //   try {
// //     const newUser = new User({ email, username, password });
// //     await newUser.save();
// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error registering user', error });
// //   }
// // });

// app.post('/register', async (req, res) => {
//     console.log('Register request received:', req.body); // Log the request body
//     const { email, username, password } = req.body;
  
//     try {
//       const newUser = new User({ email, username, password });
//       await newUser.save();
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Error registering user:', error); // Log the error
//       res.status(500).json({ message: 'Error registering user', error });
//     }
//   });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && user.password === password) {
//       res.status(200).json({ message: 'Login successful', user });
//     } else {
//       res.status(401).json({ message: 'Invalid username or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// });

// app.post('/api/save-details', async (req, res) => {
//   const { email, name, age, height, weight, emergencyContact1, emergencyContact2 } = req.body;

//   if (!email || !name || !age || !height || !weight || !emergencyContact1 || !emergencyContact2) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.personalDetails = { name, age, height, weight, emergencyContact1, emergencyContact2 };
//     await user.save();

//     res.status(200).json({ message: 'Details saved successfully', user });
//   } catch (error) {
//     console.error('Error saving details:', error);
//     res.status(500).json({ message: 'Error saving details', error });
//   }
// });

// app.get('/api/get-details', async (req, res) => {
//   const { email } = req.query;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.personalDetails) {
//       return res.status(404).json({ message: 'No user data found' });
//     }

//     res.status(200).json(user.personalDetails);
//   } catch (error) {
//     console.error('Error fetching details:', error);
//     res.status(500).json({ message: 'Error fetching details', error });
//   }
// });
// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


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

// app.post('/api/save-details', async (req, res) => {
//   const {name, age, height, weight, emergencyContact1, emergencyContact2 } = req.body;

//   if (!name || !age || !height || !weight || !emergencyContact1 || !emergencyContact2) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.personalDetails = { name, age, height, weight, emergencyContact1, emergencyContact2 };
//     await user.save();

//     res.status(200).json({ message: 'Details saved successfully', user });
//   } catch (error) {
//     console.error('Error saving details:', error);
//     res.status(500).json({ message: 'Error saving details', error });
//   }
// });

// app.post(
//   '/api/save-details',
//   async (req, res) => {
//     const { email, name, age, height, weight, emergencyContact1, emergencyContact2 } = req.body;

//     console.log('Incoming Request:', req.body);

//     if (!email || !name || !age || !height || !weight || !emergencyContact1 || !emergencyContact2) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       user.personalDetails = { name, age, height, weight, emergencyContact1, emergencyContact2 };
//       await user.save();

//       res.status(200).json({ message: 'Details saved successfully', user });
//     } catch (error) {
//       console.error('Error saving details:', error.message);
//       res.status(500).json({ message: 'Error saving details', error: error.message });
//     }
//   }
// );

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


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});