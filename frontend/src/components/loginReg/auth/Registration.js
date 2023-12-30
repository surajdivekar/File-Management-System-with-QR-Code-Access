import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as authServies from "../../../controller/authController";

const Registration = () => {
  const navigate = useNavigate();

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const [tc, setTc] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setPasswordConfirm("");
    setTc(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actualData = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      password_confirmation: password_confirmation,
      tc: tc,
    };

    if (
      actualData.name &&
      actualData.email &&
      actualData.mobile &&
      actualData.password &&
      actualData.password_confirmation !== null &&
      actualData.tc !== false
    ) {
      if (actualData.password === actualData.password_confirmation) {
        try {
          const submitRes = await authServies.insertAdmin(actualData);
          console.log(submitRes);

          // Show success toast
          toast.success(submitRes.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          // Reset form fields
          resetForm();
          console.log(submitRes);
          setError({
            status: true,
            msg: submitRes,
            type: "success",
          });
          // Navigate to the login page
          // navigate("");
        } catch (error) {
          setError({
            status: true,
            msg: "An error occurred while processing your request.",
            type: "error",
          });
        }
      } else {
        setError({
          status: true,
          msg: "Password and Confirm Password Doesn't Match",
          type: "error",
        });
      }
    } else {
      setError({
        status: true,
        msg: "All fields are required",
        type: "error",
      });
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{
          "& .MuiTextField-root": { mt: 1, m: 1, width: "30ch" },
        }}
        autoComplete="off"
      >
        <div>
          <TextField
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Admin Name"
          />
          <TextField
            margin="normal"
            required
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            label="Mobile"
          />
        </div>

        <div>
          <TextField
            margin="normal"
            required
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email Address"
          />
        </div>
        <div>
          <TextField
            margin="normal"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
          />

          <TextField
            margin="normal"
            required
            id="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            label="Confirm Password"
            type="password"
          />
        </div>

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={tc}
              onChange={(e) => setTc(e.target.checked)}
            />
          }
          label="I agree to term and condition.*"
        />
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Registration;
