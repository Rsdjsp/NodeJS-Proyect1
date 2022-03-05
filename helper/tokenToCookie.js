const { env } = require("../database/credentials");

function tokenToCookie(res, response) {
  return res
    .cookie("userId", response.userId, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .cookie("token", response.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json(response);
}

module.exports = tokenToCookie;
