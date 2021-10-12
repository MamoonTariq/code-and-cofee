const UserAuthantication = (req, res, next) => {
  const { token = "" } = req.headers;
  if (token) {
    next();
  } else {
    res.json({
      message: "token required",
      status: 201,
    });
  }
};
export default UserAuthantication;
