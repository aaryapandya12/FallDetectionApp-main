// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// // const { PythonShell } = require('python-shell');
// require('dotenv').config();
// const joblib = require('joblib');

// const userRoutes = require('./routes/userRoutes');
// const reminderRoutes = require("./routes/reminderRoutes");
// const historyRoutes = require("./routes/historyRoutes");
// // const fallDetectionRoutes = require("./routes/fallDetectionRoutes");

// const app = express();
// const PORT = process.env.PORT || 8081;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(morgan('dev'));

// const model = joblib.load('fall_detection_models.pkl');
// const scaler = joblib.load('scalers.pkl');

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// app.post('/predict', (req, res) => {
//   const newData = req.body.data;

//   // Preprocess the new data
//   const newDataScaled = scaler.transform([newData]);

//   // Make a prediction
//   const prediction = model.predict(newDataScaled);

//   // Send the prediction back to the client
//   res.json({ prediction: prediction[0] });
// });


// // Routes
// app.use('/api', userRoutes);
// app.use("/api/reminders", reminderRoutes);
// app.use("/api/history", historyRoutes);
// // app.use("/api/predict",fallDetectionRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { PythonShell } = require('python-shell'); // Import python-shell
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const reminderRoutes = require("./routes/reminderRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

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

// API endpoint for fall detection
app.post('/predict', (req, res) => {
  const newData = req.body.data;

  // Options for python-shell
  const options = {
    mode: 'text',
    pythonPath: 'python3', // Use 'python' if on Windows
    scriptPath: __dirname, // Path to the directory containing predict.py
    args: [JSON.stringify(newData)], // Pass input data as a JSON string
  };

  // Run the Python script
  PythonShell.run('predict.py', options, (err, results) => {
    if (err) {
      console.error('Error running Python script:', err);
      return res.status(500).json({ message: 'Error making prediction' });
    }

    // Parse the prediction result
    const prediction = JSON.parse(results[0]).prediction;
    res.json({ prediction });
  });
});

// Routes
app.use('/api', userRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/history", historyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});