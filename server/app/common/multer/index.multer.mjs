import Multer from 'multer';

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../server/app/common/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('wrong file extension'), false);
  }
};

const PostImageMulter = async (req, res, next) => {
  let uploader = await Multer({
    storage: storage,
    fileFilter: fileFilter,
  }).any('image');

  uploader(req, res, function (err) {
    if (err) {
      res.json({
        error: err.message,
        status: 201,
      });
    } else {
      next();
    }
  });
};

export default PostImageMulter;
