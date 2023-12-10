const { User } = require("../models");
const { Group } = require(process.cwd() + "/models"); // Assuming your Sequelize model is named 'User'

exports.renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
};

exports.renderJoin = (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
};

exports.renderMain = async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["nick"],
        },
      ],
    });
    console.log("[controller/page.js 15] allGroups", groups);
    res.render("main", {
      title: "Time To Meet",
      groups,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderCreateGroup = (req, res) => {
  res.render("createGroup");
};
