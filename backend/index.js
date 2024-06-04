const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "https://665e9ff1c5fcfdc594f71264--voluble-cajeta-a822b9.netlify.app/",
  })
);
mongoose.connect(
  "mongodb+srv://praveenuppar718:ztYyeKCHTGI7ugbW@holidaybooking.2fi0rov.mongodb.net/?retryWrites=true&w=majority&appName=HolidayBooking"
);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        email,
      });
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/places", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const {
      title,
      address,
      description,
      perks,
      checkIn,
      checkOut,
      guests,
      price,
      contact,
    } = req.body;
    const postDoc = await Place.create({
      title,
      address,
      description,
      perks,
      checkIn,
      checkOut,
      guests,
      price,
      contact,
      cover: newPath,
      owner: info.id,
    });
    res.json(postDoc);
  });
});

app.put("/places", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const {
      id,
      title,
      address,
      description,
      perks,
      checkIn,
      checkOut,
      guests,
      price,
      contact,
    } = req.body;
    const postDoc = await Place.findById(id);
    const isOwner = JSON.stringify(postDoc.owner) === JSON.stringify(info.id);
    if (!isOwner) {
      return res.status(400).json("Did not find any Place");
    }
    await postDoc.update({
      title,
      address,
      description,
      perks,
      checkIn,
      checkOut,
      guests,
      price,
      contact,

      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});

app.get("/places", async (req, res) => {
  res.json(
    await Place.find()
      .populate("owner", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Place.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Place.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.post("/bookings", async (req, res) => {
  const { checkIn, checkOut, GuestPhone, GuestName, totalPrice } = req.body;
  const postDoc = await Booking.create({
    checkIn,
    checkOut,
    GuestName,
    GuestPhone,
    totalPrice,
    owner: info.id,
  });
  res.json(postDoc);
});

app.get("/bookings", async (req, res) => {
  res.json(
    await Booking.find()
      .populate("owner", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Booking.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.get("/booking/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Booking.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.get("/test", (req, res) => {
  res.json("Test OK");
});
app.listen(4000, () => {
  console.log("server running on localhost:4000");
});
