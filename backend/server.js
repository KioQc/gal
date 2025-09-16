const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.array("files"), (req, res) => {
  res.json({ status: "ok", files: req.files.map(f => f.filename) });
});

app.get("/images", (req, res) => {
  const fs = require("fs");
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json([]);
    res.json(files);
  });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
