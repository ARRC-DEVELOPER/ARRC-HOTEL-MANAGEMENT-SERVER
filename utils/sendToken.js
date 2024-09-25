const sendToken = (res, user, message, statusCode = 200) => {
  try {
    const token = user.getJWTToken();

    const options = {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "Development" ? false : true,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    };

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      message,
      user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Invalid Credentials!",
    });
  }
};

module.exports = {
  sendToken,
};
