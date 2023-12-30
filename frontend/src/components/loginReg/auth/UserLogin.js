import { TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as allServices from "../../../controller/authController";

const UserLogin = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (actualData.email && actualData.password) {
      try {
        const res = await allServices.loginUser(actualData);

        if (res.success) {
          // Successful login
          console.log("Login successful", res.data);

          // Determine the role of the user (admin or user)
          const role = res.data.role;

          // Redirect based on the role
          if (role === "admin") {
            navigate("/admin_dashboard"); // Update with the admin dashboard path
          } else if (role === "user") {
            navigate("/user_dashboard"); // Update with the user dashboard path
          } else {
            // Handle unexpected role
            setError({ status: true, msg: "Invalid role", type: "error" });
          }
        } else {
          // Error during login
          setError({
            status: true,
            msg: res.error || "Login failed",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError({
          status: true,
          msg: "An error occurred during login",
          type: "error",
        });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Login
          </Button>
        </Box>
        <NavLink to="/sendpasswordresetemail">Forgot Password ?</NavLink>
        {error.status ? (
          <Alert severity={error.type} sx={{ mt: 3 }}>
            {error.msg}
          </Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default UserLogin;
