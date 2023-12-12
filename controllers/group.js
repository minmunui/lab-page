const { Group, User, GroupUser, AvailableTime } = require(
  process.cwd() + "/models",
);
const { TIMES } = require("../utils/constants");
// 특정 유저를 특정 그룹에 추가
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
// 10진수를 24자리의 2진수 문자열로 변환
const to24number = (binaryNumber) => {
  const binaryNumberArray = binaryNumber.split("");
  while (binaryNumberArray.length < 24) {
    binaryNumberArray.unshift("0");
  }
  return binaryNumberArray.join("");
};
// intAvailableTime을 받아서 사용 가능한 시간대를 array로 반환
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
// userId를 받아 해당 유저가 속한 그룹들의 정보를 반환
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
// group의 id를 받아 그룹의 정보를 랜더링
exports.renderGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const userId = req.user.id;
    let group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
        },
      ],
    });
    const owner = await User.findByPk(group.ownerId, {
      attributes: ["id", "nick"],
    });
    if (!group.Users.find((user) => user.id === userId)) {
      await joinGroup(groupId, userId);
    }
    group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
        },
      ],
    });
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

    res.render("group", { group, times, users, owner });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
// 그룹 생성
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
// 특정 그룹에 속한 유저들의 특정 시간을 toggle 하는 함수
exports.patchTime = async (req, res, next) => {
  // body: { time: 0, userId: 1, groupId: 1 }
  try {
    const { time, userId, groupId } = req.body;
    console.log(`time: ${time}, userId: ${userId}, groupId: ${groupId}`);
    const availableTime = await AvailableTime.findOne({
      where: {
        userId,
        groupId,
      },
    });
    console.log(`availableTime: ${availableTime.dataValues.availableTime}`);
    const binaryAvailableTime = to24number(
      availableTime.availableTime.toString(2),
    );
    const newBinaryAvailableTime = binaryAvailableTime.split("");
    newBinaryAvailableTime[time] =
      newBinaryAvailableTime[time] === "1" ? "0" : "1";
    await AvailableTime.update(
      {
        availableTime: parseInt(newBinaryAvailableTime.join(""), 2),
      },
      {
        where: {
          userId,
          groupId,
        },
      },
    );
    res.status(200).json({
      message: "success",
      available: newBinaryAvailableTime[time] === "1",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
