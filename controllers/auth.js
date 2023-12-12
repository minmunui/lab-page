const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?error=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};

exports.modifyUser = async (req, res, next) => {
  const { nick, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 12);
    console.log("req.user.id", req.user.id);
    console.log("body", req.body);
    await User.update(
      {
        nick,
        password: hash,
      },
      {
        where: { id: req.user.id },
      },
    );
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
