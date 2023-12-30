const express = require("express");
const fileController = require("../controllers/fileController");
const router = express.Router();

router.post("/upload", fileController.uploadFile);
router.get("/", fileController.getAllFiles);
router.get("/:user_id", fileController.getAllFilesByUserId);
// router.delete("/:fileId", fileController.deleteFile);

module.exports = router;
