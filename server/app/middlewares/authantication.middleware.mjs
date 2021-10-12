import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const UserAuthantication = (req, res, next) => {
  const { token = "" } = req.headers;
  if (token) {
    const getTokenData = jwt.verify(token, jwtSecret);
    console.log(getTokenData);
    const { _id = "", email = "" } = getTokenData;
    if (_id && email) {
      next();
    } else {
      res.json({
        message: "invalid token",
        status: 201,
      });
    }
  } else {
    res.json({
      message: "token required",
      status: 201,
    });
  }
};
export default UserAuthantication;
