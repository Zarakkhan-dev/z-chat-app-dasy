import express from "express"
import "dotenv/config"
import AuthRoute from "./routes/auth.route.js"
import UserRoute from "./routes/user.route.js"
import ChatRoute from "./routes/chat.route.js"
import { databaseConnection } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

const PORT = process.env.PORT ;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
  }));

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/chat", ChatRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    databaseConnection()
})