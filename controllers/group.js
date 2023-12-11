const { Group, User, GroupUser, AvailableTime } = require(
  process.cwd() + "/models",
);
const { TIMES } = require("../utils/constants");
const joinGroup = async (groupId, userId) => {
  try {
    await GroupUser.create({
      groupId,
      userId,
    });
    await AvailableTime.create({
      groupId,
      userId,
    });
  } catch (err) {
    console.error(err);
  }
};

const to24number = (binaryNumber) => {
  const binaryNumberArray = binaryNumber.split("");
  while (binaryNumberArray.length < 24) {
    binaryNumberArray.unshift("0");
  }
  return binaryNumberArray.join("");
};
const getAvailableTime = (intAvailableTime) => {
  // 16의 경우 [false, false, false, false, false, false, false, true, false, false, false, false]
  const binaryAvailableTime = to24number(intAvailableTime.toString(2));
  const availableTime = [];
  for (let i = 0; i < binaryAvailableTime.length; i++) {
    if (binaryAvailableTime[i] === "1") {
      availableTime.push(true);
    } else {
      availableTime.push(false);
    }
  }
  return availableTime;
};

exports.getBelongingGroup = async (userId) => {
  try {
    const groups = await User.findAll({
      include: [
        {
          model: Group,
        },
      ],
      where: {
        id: userId,
      },
    });
    // groups.forEach((group) => console.log(group));
    return groups;
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
    if (!group.Users.find((user) => user.id === userId)) {
      await joinGroup(groupId, userId);
    }
    const availableTimeResult = await AvailableTime.findAll({
      where: {
        groupId,
      },
    });
    const times = TIMES;

    const availableTimes = availableTimeResult.sort((a, b) => {
      if (a.userId < b.userId) {
        return -1;
      }
      if (a.userId > b.userId) {
        return 1;
      }
      return 0;
    });

    const users = group.Users.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    users.forEach((user, index) => {
      user.availableTime = getAvailableTime(
        availableTimes[index].availableTime,
      );
    });

    res.render("group", { group, times, users });
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
