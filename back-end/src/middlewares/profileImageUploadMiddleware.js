const multer = require("multer");
const ResponseError = require("../errors/ResponseError");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

module.exports.profileImageUploadMiddleware = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype == "image/jpeg")
      cb(null, true);
    else
      cb(
        new ResponseError(400, {
          errors: [
            {
              msg: "Unsupported image file. must be jpg or jpeg",
              param: "profileImage",
              location: "body",
            },
          ],
        })
      );
  },
});
