const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  // filename: function (req, file, cb) {
  //   cb(
  //     null,
  //     file.fieldname + "-" + Date.now() + path.extname(file.originalname)
  //   );
  // },
  filename: (req, file, cb) => {
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\s+/g, "");
    cb(null, timestamp + "-" + file.originalname);
  },

});

const upload = multer({
  storage: storage,
  //   limits: { fileSize: 1000000 }, // 1 MB file size limit
}).single("file");

module.exports = upload;
