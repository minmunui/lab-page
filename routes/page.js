const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  renderProfile,
  renderJoin,
  renderMain,
  renderCreateGroup,
} = require("../controllers/page");
const { createGroup, renderGroup } = require("../controllers/group");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  next();
});

router.get("/profile", isLoggedIn, renderProfile);

router.get("/join", isNotLoggedIn, renderJoin);

router.get("/group", isLoggedIn, renderCreateGroup);

router.get("/group/:id", isLoggedIn, renderGroup);

router.post("/group", isLoggedIn, createGroup);

router.get("/", renderMain);

//TODO : group page

module.exports = router;
