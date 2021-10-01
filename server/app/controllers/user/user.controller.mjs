const SignUp = (req, res) => {
  // console.log({ req });
  return res.json({
    success: 0,
    message: "User Name Already Exists",
  });
};

export { SignUp };
