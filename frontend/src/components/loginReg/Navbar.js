import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#9c27b0" }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              File Management System
            </Typography>

            <Button
              component={NavLink}
              to="/home"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "#6d1b7b" : "" };
              }}
              sx={{ color: "white", textTransform: "none" }}
            >
              Home
            </Button>

            <Button
              component={NavLink}
              to="/contact"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "#6d1b7b" : "" };
              }}
              sx={{ color: "white", textTransform: "none" }}
            >
              Contact
            </Button>

            <Button
              component={NavLink}
              to="/"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "#6d1b7b" : "" };
              }}
              sx={{ color: "white", textTransform: "none" }}
            >
              Login/Registration
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
