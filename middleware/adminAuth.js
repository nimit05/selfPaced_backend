const { Users } = require("../data/db");

async function adminAuth(req, res, next) {
  let token = false;
  let authUser = false;
  if (req.session) {
    token = req.session.token;
  }

  if (token) {
    authUser = await Users.findOne({
      where: {
        token: token
      }
    });
  }

  if (authUser) {
    if (authUser.email === "iamtushar324@gmail.com" || authUser.email === "nimitwadhwa722@gmail.com") {
      req.user = authUser;
      next();
    } else {
      res.send("false");
    }
  } else {
    res.send("/regis.html");
  }
}

module.exports = { adminAuth };
