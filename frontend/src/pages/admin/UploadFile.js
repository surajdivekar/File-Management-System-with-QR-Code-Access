import React, { useState, useEffect, useCallback } from "react";

import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import * as allServices from "../../controller/authController";
import InputLabel from "@mui/material/InputLabel";
import QRCode from "qrcode.react";

const MyForm = () => {
  const [formData, setFormData] = useState({
    admin_id: "",
    user_id: "",
    filename: "",
    fileType: "",
    selectedFile: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [qrCodeData, setQrCodeData] = useState("");

  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const FetchData = useCallback(async () => {
    const data = await allServices.getAllUsers();
    console.log(data);
    setUsers(data);
  }, []);
  // Fetch the list of users from the backend when the component mounts
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const files = await allServices.getUploadedFiles();
        setUploadedFiles(files);
        // Generate QR code data and link for each file and store it in state
        const updatedFiles = files.map((file) => ({
          ...file,
          qrCodeData: `http://localhost:9090/uploads/${file.file_path}`,
          fileLink: `http://localhost:9090/uploads/${file.file_path}`,
        }));
        setUploadedFiles(updatedFiles);
        // Generate QR code data for each file and store it in state
        const qrCodeDataArray = updatedFiles.map((file) => ({
          file_id: file.file_id,
          qrCodeData: `http://localhost:9090/uploads/${file.file_path}`,
        }));
        setQrCodeData(qrCodeDataArray);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    FetchData();
    const admin_idFromStorage = localStorage.getItem("userId");
    if (admin_idFromStorage) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        admin_id: admin_idFromStorage,
      }));
    }
    fetchUploadedFiles();
  }, [FetchData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    let fileType = "";

    if (["png", "jpeg", "jpg"].includes(fileExtension)) {
      fileType = "image";
    } else if (["mp4", "avi"].includes(fileExtension)) {
      fileType = "video";
    } else if (["pdf"].includes(fileExtension)) {
      fileType = "pdf";
    } else if (["ppt", "pptx"].includes(fileExtension)) {
      fileType = "ppt";
    } else if (["doc", "docx"].includes(fileExtension)) {
      fileType = "word";
    } else {
      // Handle other file types as needed
      console.warn(`File type not recognized for ${fileExtension} extension.`);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedFile: selectedFile,
      fileType: fileType,
    }));
  };

  const handleUserSelect = async (user_id) => {
    setFormData({ ...formData, user_id });

    // Fetch user details based on the selected user_id
    // try {
    //   const response = await fetch(`http://localhost:9090/api/users/${user_id}`);
    //   const userData = await response.json();
    //   setSelectedUserData(userData);
    // } catch (error) {
    //   console.error("Error fetching user details:", error);
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Destructure formData
    console.log(formData);
    const { admin_id, user_id, filename, fileType, selectedFile } = formData;

    // Create a FormData object to handle file uploads
    const formDataForUpload = new FormData();
    formDataForUpload.append("admin_id", admin_id);
    formDataForUpload.append("user_id", user_id);
    formDataForUpload.append("file_name", filename);
    formDataForUpload.append("file_type", fileType);
    formDataForUpload.append("file", selectedFile);
    try {
      console.log(formData);
      // Assuming that uploadFile function returns a response with a success message
      const response = await allServices.uploadFile(formDataForUpload);

      // Handle the response accordingly
      console.log(response);

      // Optionally, you can reset the form data after successful submission
      setFormData({
        user_id: "",
        filename: "",
        fileType: "",
        selectedFile: null,
      });
    } catch (error) {
      // Handle the error, log it, or show an error message to the user
      console.error("Error uploading file:", error);
    }
  };
  const handleGenerateQrCode = (index) => {
    setSelectedFileIndex(index);
    setQrCodeModalOpen(true);
  };

  const handleCloseQrCodeModal = () => {
    setQrCodeModalOpen(false);
    setSelectedFileIndex(null);
  };
  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "left",
        }}
      >
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Dropdown for selecting a user */}
              {/* <FormControl
                variant="standard"
                fullWidth
                style={{ width: "140px" }}
              >
                <InputLabel>Select User</InputLabel>
                <Select
                  // defaultValue={0}
                  // displayEmpty
                  label="Select User"
                  name="user_id"
                  value={formData.user_id}
                  onChange={(e) => handleUserSelect(e.target.value)}
                >
                  <MenuItem value={"none"} disabled>
                    <em>None</em>
                  </MenuItem>
                  {users.map((item, index) => (
                    <MenuItem value={item.user_id} key={index}>
                      {item.user_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Select User</InputLabel>
                <Select
                  // variant="standard"
                  label="Select User"
                  name="user_id"
                  value={formData.user_id}
                  onChange={(e) => handleUserSelect(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    <em>Select User</em>
                  </MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.useu_id} value={user.user_id}>
                      {user.user_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Rest of the form remains the same */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label="File Name"
                  name="filename"
                  value={formData.filename}
                  onChange={handleChange}
                  variant="outlined"
                  style={{ width: "100%" }}
                  required
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <input
                  accept=".mp4,.avi,.jpg,.jpeg,.png,.gif,.pdf,.ppt,.pptx,.doc,.docx"
                  style={{ display: "none" }}
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput">
                  <Button variant="contained" component="span">
                    Upload File
                  </Button>
                </label>
                {formData.selectedFile && (
                  <span>{formData.selectedFile.name}</span>
                )}
              </FormControl>
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">File Type</FormLabel>
                <RadioGroup
                  row
                  aria-label="fileType"
                  name="fileType"
                  value={formData.fileType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="video"
                    control={<Radio />}
                    label="Video"
                  />
                  <FormControlLabel
                    value="image"
                    control={<Radio />}
                    label="Image"
                  />
                  <FormControlLabel
                    value="pdf"
                    control={<Radio />}
                    label="PDF"
                  />
                  <FormControlLabel
                    value="ppt"
                    control={<Radio />}
                    label="PPT"
                  />
                  <FormControlLabel
                    value="word"
                    control={<Radio />}
                    label="Word"
                  />
                </RadioGroup>
              </FormControl>
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
      {/* Table Section */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No.</TableCell>
              <TableCell>File ID</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>File Type</TableCell>
              <TableCell>Generate QR</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedFiles.map((file, index) => (
              <TableRow key={file.file_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{file.file_id}</TableCell>
                <TableCell>{file.file_name}</TableCell>
                <TableCell>{file.file_type}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleGenerateQrCode(index)}
                  >
                    Generate QR Code
                  </Button>
                </TableCell>
                <TableCell>
                  <a
                    href={file.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={qrCodeModalOpen}
        onClose={handleCloseQrCodeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={qrCodeModalOpen}>
          <div>
            {selectedFileIndex !== null && (
              <QRCode value={qrCodeData[selectedFileIndex]?.qrCodeData} />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default MyForm;
