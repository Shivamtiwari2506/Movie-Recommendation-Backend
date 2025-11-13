import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import connectDB from "./db/connectDB.js";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
connectDB();
app.use("/api", recommendationRoutes);

app.listen(port, () => {{
   console.log(`Server is running on port ${port}`);
}});
