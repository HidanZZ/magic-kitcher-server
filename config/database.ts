import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
	try {
		console.log("uriii", process.env.mongoURI);

		const mongoURI: string = process.env.mongoURI;
		await connect(mongoURI);
		console.log("MongoDB Connected...");
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

export default connectDB;
