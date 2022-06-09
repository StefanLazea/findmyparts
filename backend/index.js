const express = require("express");
const routes = require("./routes");
const model = require("./models");
const dotenv = require("dotenv");
const uploader = require("express-fileupload");
const cors = require("cors");
const app = express();
const path = require("path");
const bindWebSocket = require("./socket").bindWebSocket;
const http = require("http");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploader());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT;
model.sequelize.sync();
app.use("/api", routes);

app.use(express.static("../front/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build", "index.html"));
});

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  bindWebSocket(socket);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
