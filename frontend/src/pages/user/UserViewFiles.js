import React, { useState, useEffect, useCallback } from "react";

import {
  Button,
  Card,
  CardContent,
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

import QRCode from "qrcode.react";

import Typography from "@mui/material/Typography";
const MyForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [qrCodeData, setQrCodeData] = useState("");

  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [users, setUsers] = useState([]);

  const FetchData = useCallback(async (user_id) => {
    console.log(user_id);
    const data = await allServices.getUserById(user_id);
    console.log(data);
    setUsers(data);
  }, []);
  // Fetch the list of users from the backend when the component mounts
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const user_idFromStorage = localStorage.getItem("userId");
        const data = await allServices.getUserById(user_idFromStorage);
        console.log(data);
        setUsers(data);
        const files = await allServices.getUploadedFilesbyUserId(
          user_idFromStorage
        );

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
    fetchUploadedFiles();
  }, [FetchData]);

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
      {/* User Details Card */}
      {/* <Card style={{ marginTop: "50px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          

          <div>
            <Typography variant="subtitle1">
              User Name: {users.user_name}
            </Typography>
            <Typography variant="subtitle1">
              User Mobile: {users.user_mbno}
            </Typography>
            <Typography variant="subtitle1">
              User Email: {users.user_email}
            </Typography>
          </div>
        </CardContent>
      </Card> */}
      <Card style={{ marginTop: "20px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          {/* Map over users to display details for each user */}

          <div>
            <Typography variant="subtitle1">
              <span style={{ fontWeight: "bold" }}>User Name:</span>{" "}
              {users.user_name}
            </Typography>
            <Typography variant="subtitle1">
              <span style={{ fontWeight: "bold" }}>User Mobile:</span>{" "}
              {users.user_mbno}
            </Typography>
            <Typography variant="subtitle1">
              <span style={{ fontWeight: "bold" }}>User Email:</span>{" "}
              {users.user_email}
            </Typography>
            {/* Add a divider between user details */}
          </div>
        </CardContent>
      </Card>

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
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card>
          <Fade in={qrCodeModalOpen}>
            <div>
              {selectedFileIndex !== null && (
                <QRCode value={qrCodeData[selectedFileIndex]?.qrCodeData} />
              )}
            </div>
          </Fade>
        </Card>
      </Modal>
    </div>
  );
};

export default MyForm;
