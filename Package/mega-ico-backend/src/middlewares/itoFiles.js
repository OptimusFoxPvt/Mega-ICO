const multer = require("multer");
const fs = require("fs");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const upload = (fields) => {
  console.log({ data: "here1111" }, fields);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("2");
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      let dir = "../../public/images";
      if (!fs.existsSync("../../public")) {
        fs.mkdirSync("../../public");
      }
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      cb(error, "../../public/images/");
    },
    filename: (req, file, cb) => {
      const name = file.fieldname
        .replace(/([A-Z])/g, " $1")
        .replace(/ /g, "_")
        .toLowerCase();
      console.log(name);
      cb(null, name + "_" + Date.now() + "." + MIME_TYPE_MAP[file.mimetype]);
    },
  });

  return multer({
    storage: storage,
    limits: { fieldSize: 25 * 1024 * 1024 },
  }).array(fields, 5);
};

module.exports = upload;
