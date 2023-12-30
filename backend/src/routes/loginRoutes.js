const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const loginController = require("../controllers/loginController");

router.post("/", loginController.login);

module.exports = router;
