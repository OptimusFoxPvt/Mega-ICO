const upload = (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var passport = req.files.passport;
    var filename = Date.now() + file.name;
    var passport_filename = Date.now() + "passport.jpg";

    console.log(filename);
    console.log(root + "/images/" + filename);
    file.mv(root + "/images/" + filename);
    file.mv(root + "/images/" + passport_filename);
  }
};
