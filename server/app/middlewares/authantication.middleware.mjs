const UserAuthantication = (req, res, next) => {
  const tokens = req.headers;
  console.log(tokens);
  // res.json({
  //   message: "login not ",
  //   status: 201,
  // });
  next();
};
export default UserAuthantication;
