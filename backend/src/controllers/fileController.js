const upload = require("./multer");
const pool = require("../config/databaseConfig");

async function uploadFile(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "File upload failed" });
    }

    try {
      const { file_name, file_type, admin_id, user_id } = req.body;
      const filePath = req.file.filename;
      const mimetype = req.file.mimetype;

      // console.log(req.file);

      const query =
        "INSERT INTO files_data (file_name, file_path, file_type,mime_type, admin_id,user_id) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [
        file_name,
        filePath,
        file_type,
        mimetype,
        admin_id,
        user_id,
      ];
      const result = await pool.promise().query(query, values);

      console.log(result);
      if (result[0] && result.length > 0 && result[0].affectedRows > 0) {
        res.json({
          message: "File uploaded successfully",
          fileId: result.insertId,
        });
      } else {
        console.error("Failed to insert into the database");
        res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
async function getAllFiles(req, res) {
  try {
    // Perform a SELECT query to get all files from the database
    const query = "SELECT * FROM files_data";
    const [rows] = await pool.promise().query(query);

    // Send the list of files as a JSON response
    res.json({ files: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getAllFilesByUserId(req, res) {
  try {
    const { user_id } = req.params; // Assuming user_id is passed as a route parameter

    const query =
      "SELECT * FROM files_data WHERE user_id = ? AND is_deleted = 0";
    const [rows] = await pool.promise().query(query, [user_id]);

    res.json({ files: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  uploadFile,
  getAllFiles,
  getAllFilesByUserId,
};
