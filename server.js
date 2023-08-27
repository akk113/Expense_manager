import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/dbServer.js";
import userRoute from "./routes/userRoute.js";
import transectionRoute from "./routes/transectionRoute.js";
import { fileURLToPath } from "url";
import path from "path";

// Define __filename and __dirname using import.meta.url and path.dirname()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config env file:
dotenv.config();

//call database:
connectDB();

//rest obj:
const app = express();

//middlewares:
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//ROUTE:
//user route:
app.use("/api/users", userRoute);
//transection route:
app.use("/api/transections", transectionRoute);

//static file:
app.use(express.static(path.join(__dirname, "./client/build")));

// serve index.html for any other requests
app.get("*", (req, res) => {
  // const indexPath = path.resolve(__dirname, "../client/dist", "index.html");
  res.sendFile(
    path.resolve(__dirname, "client", "build", "index.html"),
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: Unable to serve index.html");
      }
    }
  );
});

//port:
const PORT = process.env.PORT || 8080;

//server listening:
app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`.bgCyan);
});
