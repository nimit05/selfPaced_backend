const { Users, Transaction, Products } = require("../data/db");
const { getrandomstring } = require("../utils/string");
const { sendOtpToMail } = require("../utils/emailVeri");

async function createusers(f_name, username, email, password, phone_Number, pro_img, otp) {
  let finduser = await Users.findOne({
    where: {
      username: username
    }
  });

  let efinduser = await Users.findOne({
    where: {
      email: email
    }
  });

  let pfinduser = await Users.findOne({
    where: {
      phone_Number: phone_Number
    }
  });

  if (finduser || efinduser || pfinduser) {
    let err = "";

    if (finduser) {
      err = err + " username exist";
    }
    if (efinduser) {
      err = err + " email exist";
    }
    if (pfinduser) {
      err = err + " phonenumber exist";
    }

    return { error: err };
  }

  const user = await Users.create({
    f_name,
    username,
    email,
    password,
    phone_Number,
    token: getrandomstring(32),
    OTP: otp,
    Verified: true,
    pro_img,
    refferalCode: getrandomstring(24)
  });

  const newuser = await Users.findOne({
    attributes: ["f_name", "username", "email", "phone_Number", "Verified"],
    where: { token: user.token }
  });
  setTimeout(() => {
    newuser.OTP = null;

    if (newuser.Verified === false) {
      newuser.destroy();
    }
    newuser.save();
  }, 900000);
  return newuser;
}

async function findUserByOTP(OTP) {
  const user = await Users.findOne({
    attributes: ["f_name", "username", "email", "phone_Number"],
    where: { OTP }
  });

  if (!user) {
    return { body: ["Invalid OTP"] };
  }
  const ys = "verified Succesfully";
  return ys;
}

async function findUserByToken(token) {
  const user = await Users.findOne({
    where: { token }
  });

  if (!user) {
    return { body: ["Invalid token"] };
  }

  return user;
}

async function findUser(username, password) {
  const auth = await Users.findOne({
    where: { username }
  });

  return auth;
}
async function findUserByEmail(email) {
  const auth = await Users.findOne({
    where: { email }
  });

  return auth;
}

async function updateUserDet(username, name, password, img) {
  const user = await User.findOne({
    where: {
      username: username
    }
  });

  if (user) {
    user.name = name;
    user.password = password;
    user.pro_img = img;

    User.save();

    return true;
  } else {
    return false;
  }
}

async function verified(email) {
  let user = await Users.findOne({
    where: {
      email: email
    }
  }).catch(() => {
    return false;
  });

  if (user) {
    user.Verified = true;
    user.save();
    return true;
  } else {
    return false;
  }
}

async function Libraryfounder(username) {
  let user = await Users.findOne({
    where: { username }
  });

  return user.Library[1];
}

async function isUserExistEmail(email) {
  let user = await Users.findOne({
    where: {
      email
    }
  });

  if (user) {
    return user;
  } else {
    return false;
  }
}

async function createGoogleUser(user) {
  try {
    let token = getrandomstring(32);
    let newUser = await Users.create({
      username: user.email,
      email: user.email,
      f_name: user.name,
      pro_img: user.pro_pic,
      Verified: true,
      token: token
    });

    return newUser;
  } catch (err) {
    return { error: err };
  }
}

async function addreport(username, SellerUsername) {
  try {
    const seller = await Users.findOne({
      where: { username: SellerUsername }
    });
    let arr = seller.reports.split(";");
    arr.push(username);
    seller.reports = arr.join(";");
    seller.save();
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  createusers,
  findUserByOTP,
  findUserByToken,
  findUser,
  findUserByEmail,
  verified,
  Libraryfounder,
  isUserExistEmail,
  createGoogleUser,
  addreport
};
