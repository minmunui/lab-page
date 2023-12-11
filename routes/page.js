const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  renderProfile,
  renderJoin,
  renderMain,
  renderCreateGroup,
} = require("../controllers/page");
const {
  createGroup,
  renderGroup,
  getBelongingGroup,
} = require("../controllers/group");

const router = express.Router();

router.use(async (req, res, next) => {
  res.locals.user = req.user;
  if (req.user) {
    const belongingGroup = await getBelongingGroup(req.user.id);
    res.locals.belongingGroup = belongingGroup[0].Groups;
  }
  next();
});

router.get("/profile", isLoggedIn, renderProfile);

router.get("/join", isNotLoggedIn, renderJoin);

router.get("/group", isLoggedIn, renderCreateGroup);

router.get("/group/:id", isLoggedIn, renderGroup);

router.post("/group", isLoggedIn, createGroup);

router.get("/", renderMain);

module.exports = router;
