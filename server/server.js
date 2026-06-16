const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("Mini CRM API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});