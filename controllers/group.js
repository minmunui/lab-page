const { Group, User, GroupUser } = require(process.cwd() + "/models");

const joinGroup = async (groupId, userId) => {
  try {
    await GroupUser.create({
      groupId,
      userId,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.renderGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const userId = req.user.id;
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
        },
      ],
    });
    // console.log("[controller/group.js 15] group", group);
    // console.log("[controller/group.js 16] group.Users", group.Users);

    if (group.Users.find((user) => user.id !== userId)) {
      await joinGroup(groupId, userId);
    }
    res.render("group", { group });
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
    await joinGroup(newGroupId, req.user.id);
    res.redirect(`/group/${newGroupId}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
