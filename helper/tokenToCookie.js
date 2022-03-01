const { env } = require("../database/credentials");

function tokenToCookie(res, response) {
  if (response.success) {
    let date = new Date(new Date().setDate(new Date().getDate() + 7));
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
      .json(response.data);
  }
}

module.exports = tokenToCookie;
