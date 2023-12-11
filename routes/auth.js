const express = require("express");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

const router = express.Router();

// POST /auth/join
router.post("/join", isNotLoggedIn, join);

// POST /auth/login
router.post("/login", isNotLoggedIn, login);

// GET /auth/logout
router.get("/logout", isLoggedIn, logout);

// GET /group/:id
// router.get("/group/:id", isLoggedIn, renderGroupDetail);

// POST /group
// router.post("/group", isLoggedIn, createGroup);

module.exports = router;
