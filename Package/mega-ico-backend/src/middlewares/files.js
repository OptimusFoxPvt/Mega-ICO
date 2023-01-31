const multer = require("multer");

var storage = multer.diskStorage({
  
  destination: function (req, files, cb) {
   
    cb(null, "../public/uploads");
  },
  filename: function (req, files, cb) {
    cb(null, files.fieldname + "-" + Date.now() + path.extname(files.originalname));
  },
});

var upload = multer({ storage: storage,limits: { fieldSize: 25 * 1024 * 1024 }, });

module.exports = upload;
