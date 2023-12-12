const { isLoggedIn } = require("../middlewares");
const { createGroup, renderGroup } = require("../controllers/group");
const { renderCreateGroup } = require("../controllers/page");

const router = require("express").Router();

router.post("/", isLoggedIn, createGroup);
router.get("/", isLoggedIn, renderCreateGroup);
router.get("/:id", isLoggedIn, renderGroup);

module.exports = router;
