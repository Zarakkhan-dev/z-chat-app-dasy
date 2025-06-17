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
  origin: 'https://z-chat-using-stream-frontend-zeta.vercel.app',
  credentials: true
}));

// const ALLOWED_ORIGIN =
//   process.env.NODE_ENV === 'production'
//     ? 'https://z-chat-using-stream-frontend-zeta.vercel.app'
//     : '*';

// export async function OPTIONS() {
//   return new Response(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
//       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       'Access-Control-Allow-Credentials': 'true',
//     },
//   });
// }

// export async function GET() {
//   return Response.json({ ok: true }, {
//     headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN },
//   });
// }

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/chat", ChatRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Chat Application API");
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
//   });
// }

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    databaseConnection()
})