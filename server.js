const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const adsRoutes = require("./routes/ads.routes");
const authRoutes = require("./routes/auth.routes");
const session = require("express-session");
const MongoStore = require("connect-mongo");



mongoose.connect(
  "mongodb+srv://pawelsmolarski95:pawel@adsapp.kqdalg2.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});

db.on("error", (err) => {
  console.log("Error" + err);
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
}
app.use(
  session({
    secret: "xyz567",
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == "production",
    },
  })
);
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use(adsRoutes);
app.use("/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "404 not found..." });
});

module.exports = server;
