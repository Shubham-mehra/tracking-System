// Backend for Package Tracking System (Node.js + Express + MongoDB)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // MongoDB ODM
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
console.log(process.env.MONGODB_URI)
// Connect to MongoDB (replace with your actual MongoDB URI)
mongoose.connect(process.env.MONGODB_URI, 
//   {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define a schema for the package tracking data
const packageSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  status: { type: String, default: 'Pending' },
  currentLocation: { type: String, default: 'Origin' },
  productName : {type: String, default:'Null'},
  orderDate: String,
  estimatedDelivery: String,
  history: [
    {
      location: String,
      time: String,
      status: String
    },
  ],
});


// Admin schema for login
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

const Admin = mongoose.model('Admin', adminSchema);


// Create a model based on the schema
const Package = mongoose.model('Package', packageSchema);
const jwt = require('jsonwebtoken');
// Enable CORS
app.use(cors());
// Parse incoming JSON requests
app.use(bodyParser.json());


//Middle ware 
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


const bcrypt = require('bcryptjs');

app.get("/api/health", async (req, res) => {
  const mongoState = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const states = ["Disconnected", "Connected", "Connecting", "Disconnecting"];

  res.json({
    status: "ok",
    mongo: states[mongoState] || "Unknown",
    time: new Date().toISOString(),
  });
});


// Endpoint to create a new tracking entry
app.post('/track', async (req, res) => {
  try {
    const trackingId = uuidv4();
    const { status, currentLocation, estimatedDelivery, productName, orderDate } = req.body;

    const newPackage = new Package({
      trackingId,
      status: status || 'Pending',
      currentLocation: currentLocation || 'Origin',
      estimatedDelivery: estimatedDelivery || null,
      productName:productName ||null,
      orderDate: orderDate || null,
      history: [
        {
          location: currentLocation || 'Origin',
          status: status,
          time: new Date().toISOString(),
        },
      ],
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating package', error });
  }
});


app.get('/track/all', authMiddleware, async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});


// One-time admin registration (you can disable after first use)

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new Admin({ email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin', error: err });
  }
});


// Login Route for login of admin 
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  console.log(" user.password", user.password)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token, role: user.role });
});



// Endpoint to retrieve tracking info by tracking ID
app.get('/track/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;
    const trackingData = await Package.findOne({ trackingId });

    if (!trackingData) {
      return res.status(404).json({ message: 'Tracking ID not found' });
    }

    res.json(trackingData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving package', error });
  }
});

// Endpoint to update tracking info
app.put('/track/:trackingId/update', async (req, res) => {
  try {
    const { trackingId } = req.params;
    const { status, currentLocation, productName , estimatedDelivery, orderDate} = req.body;
console.log("orderDate",orderDate)
    const trackingData = await Package.findOne({ trackingId });

    if (!trackingData) {
      return res.status(404).json({ message: 'Tracking ID not found' });
    }

    if (status) trackingData.status = status;
    if (currentLocation) {
      trackingData.currentLocation = currentLocation;
      trackingData.productName=productName;
      trackingData.orderDate=orderDate
      trackingData.estimatedDelivery=estimatedDelivery;
      trackingData.history.push({
        location: currentLocation,
        status: status,
        time: new Date().toISOString(),
      });
    }

    await trackingData.save();
    res.json(trackingData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating package', error });
  }
});

// Endpoint to delete a product (package) by tracking ID
app.delete('/track/:trackingId/', authMiddleware, async (req, res) => {
  try {
    const { trackingId } = req.params;

    const deletedPackage = await Package.findOneAndDelete({ trackingId });

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Tracking ID not found' });
    }

    res.json({ message: 'Package deleted successfully', deletedPackage });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`📦 Package tracking backend running on http://localhost:${port}`);
});
