import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const UserAuthantication = (req, res, next) => {
  const { token = "" } = req.headers;
  if (token) {
    const getTokenData = jwt.verify(token, jwtSecret);
    console.log(getTokenData);
    const { id = "", email = "" } = getTokenData;
    if (id && email) {
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
