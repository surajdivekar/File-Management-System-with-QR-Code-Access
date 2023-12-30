const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const adminController = require("../controllers/adminController");

// router.post("/login", adminController.loginAdmin);
router.get("/", authenticateToken, adminController.getAllAdmins);
router.get("/:id", authenticateToken, adminController.getAdminById);
router.post("/", authenticateToken, adminController.createAdmin);
router.put("/", authenticateToken, adminController.updateAdmin);
router.delete("/:adminId", authenticateToken, adminController.deleteAdmin);
router.put(
  "/restore/:adminId",
  authenticateToken,
  adminController.restoreAdmin
);
module.exports = router;
