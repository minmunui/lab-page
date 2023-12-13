const express = require("express");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout, modifyUser } = require("../controllers/auth");

const router = express.Router();

// POST /auth/join
router.post("/join", isNotLoggedIn, join);

// POST /auth/login
router.post("/login", isNotLoggedIn, login);

// GET /auth/logout
router.get("/logout", isLoggedIn, logout);

router.patch("/", isLoggedIn, modifyUser);

module.exports = router;
