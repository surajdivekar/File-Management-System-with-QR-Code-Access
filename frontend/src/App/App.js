import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

import LoginReg from "../components/loginReg/auth/LoginReg";
import Contact from "../components/loginReg/Contact";
import Home from "../components/loginReg/Home";
import Layout from "../components/loginReg/Layout";

import SideMenu from "../components/sidebar/adminDrawer";
import UserSideMenu from "../components/sidebar/userDrawer";
import UserDetails from "../pages/admin/UserDetails";
import UserViewFiles from "../pages/user/UserViewFiles";
// import SideMenu from "../components/sidebar/SideMenu";
import UploadFile from "../pages/admin/UploadFile";
const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#bc63ff",
      // main: "#f83245",
      // light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="login" element={<LoginReg />} /> */}
          <Route index element={<LoginReg />} />
        </Route>
        <Route path="admin_dashboard" element={<SideMenu />}>
          <Route path="" element={<UploadFile />} />
          <Route path="user_details" element={<UserDetails />} />
        </Route>
        <Route path="user_dashboard" element={<UserSideMenu />}>
          <Route index element={<UserViewFiles />} />
        </Route>

        {/* <Route path="sidebar" element={<SideMenu />}>
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        <Route index element={<Dashboard />} />
        <Route index path="/sidebar/dashboard" element={<Dashboard />} />
        <Route path="/sidebar/customers" element={<Customers />} />
        <Route path="/sidebar/products" element={<ProductList />} />
        <Route path="/sidebar/invoices" element={<Invoices />} />
        <Route
          idex
          path="/sidebar/customerwiseinvoices/:customer_id"
          element={<CustomerWiseInvoices />}
        />
        <Route path="/sidebar/newinvoices" element={<NewInvoice />} />
        <Route path="viewinvoice/:invoice_id" element={<ViewInvoice />} />
        <Route path="payinvoice/:invoice_id" element={<PayInvoice />} />
      </Route>*/}
      </Routes>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
