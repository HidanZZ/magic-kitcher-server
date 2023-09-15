import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import connectDB from "../config/database";
import data from "./routes/api/data";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
	res.send(`API Running current datetime is ${new Date()}`);
});

app.use("/api/userdata", data);

const port = app.get("port");
const server = app.listen(port, () =>
	console.log(`Server started on port ${port}`)
);

export default server;
