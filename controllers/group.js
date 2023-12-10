const { Group, User } = require(process.cwd() + "/models");
//TODO : 그룹 생성, 그룹 삭제, 그룹 수정, 그룹 조회, 그룹 멤버 조회, 그룹 멤버 추가, 그룹 멤버 삭제
exports.renderGroup = async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.render("group", { title: "그룹 생성", groups });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.createGroup = async (req, res, next) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      description: req.body.description,
      password: req.body.password,
      maxMember: req.body.max,
      ownerId: req.user.id,
    });
    const newGroupId = group.id;
    res.redirect(`/group/${newGroupId}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
