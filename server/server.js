const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Mini CRM API Running");
});

// PORT for deployment (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});