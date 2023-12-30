const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const userController = require("../controllers/userController");

router.post("/login", authenticateToken, userController.userLogin);
router.get("/", authenticateToken, userController.getAllUsers);
router.get("/:id", authenticateToken, userController.getUserById);
router.post("/", authenticateToken, userController.createUser);
router.put("/", authenticateToken, userController.updateUser);
router.delete("/:userId", authenticateToken, userController.deleteUser);
router.put("/restore/:userId", authenticateToken, userController.restoreUser);
module.exports = router;
