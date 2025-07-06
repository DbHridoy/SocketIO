import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

// Setup for __dirname equivalent in ES modules
const _dirname = dirname(fileURLToPath(import.meta.url));

// ✅ Serve static files from "public" folder
app.use(express.static(join(_dirname, "public")));

// Serve index.html (optional, could rely on static)
app.get("/", (req, res) => {
  res.sendFile(join(_dirname, "public", "index.html"));
});

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
io.on("connection", (socket) => {
  socket.on("chat-message", (msg) => {
    console.log("message : " + msg);
  });
});
server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
