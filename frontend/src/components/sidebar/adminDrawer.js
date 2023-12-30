import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AdminSideMenuItem } from "./SideMenuItems";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {AdminSideMenuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <ListItem
                  key={item}
                  disablePadding
                  sx={{ display: "block" }}
                  style={{
                    backgroundColor: isActive ? "#C5C5C5" : "",
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
        <Divider />
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

// import React, { useEffect, useState } from "react";
// import { SideMenuItem } from "./SideMenuItems";
// import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// import { styled, useTheme, alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";

// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import InputBase from "@mui/material/InputBase";
// import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";

// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircle from "@mui/icons-material/AccountCircle";

// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";

// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
// import { Collapse, makeStyles } from "@material-ui/core";
// import { Grid, ImageList, ImageListItem } from "@mui/material";
// import GroupIcon from "@mui/icons-material/Group";

// // import Tables from "../../pages/customers/Table";
// // import Customers from "../../pages/customers/Customers";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,

//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   // backgroundColor: "#190647",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function SideMenu() {
//   const [loginData, setloginData] = useState([]);

//   const navigate = useNavigate();
//   //   useEffect(() => {
//   //     Check();
//   //     console.log(loginData);
//   //     // FetchData();
//   //   }, [navigate]);

//   //   const Check = () => {
//   //     try {
//   //       const arrayOfData = localStorage.getItem("LoginData");
//   //       const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
//   //       // setloginData(d[0]);
//   //       setloginData(d);
//   //       if (d.length === 0) {
//   //         navigate("/");
//   //       }
//   //       // navigate("/sidebar/dashboard");
//   //       console.log(d);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };

//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//     setprofileExpand(false);
//   };

//   //header
//   const Search = styled("div")(({ theme }) => ({
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto",
//     },
//   }));

//   const SearchIconWrapper = styled("div")(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   }));

//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: "inherit",
//     "& .MuiInputBase-input": {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create("width"),
//       width: "100%",
//       [theme.breakpoints.up("md")]: {
//         width: "20ch",
//       },
//     },
//   }));

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>
//         <Link to="/profile">Profile</Link>
//       </MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="error">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//       </MenuItem>
//       <MenuItem>
//         <IconButton
//           size="large"
//           aria-label="show 10 new notifications"
//           color="inherit"
//         >
//           <Badge badgeContent={10} color="error">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   const [profileExpand, setprofileExpand] = React.useState(false);

//   function handleClick() {
//     setprofileExpand(!profileExpand);
//   }

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{ transform: "translateZ(0)" }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerClose}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(!open && { display: "none" }),
//             }}
//             // hidden={open}
//           >
//             <ChevronLeftIcon />
//           </IconButton>

//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             style={{ marginLeft: "40%" }}
//             // sx={{ mx: 'auto', width: 200}}
//           >
//             {loginData.shop_name}
//           </Typography>
//           {/* <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ "aria-label": "search" }}
//             />
//           </Search> */}
//           <Box sx={{ flexGrow: 1 }} />
//           {/* <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ "aria-label": "search" }}
//             />
//           </Search> */}
//           <Box sx={{ display: { xs: "none", md: "flex" } }}>
//             {/* <IconButton
//               size="large"
//               aria-label="show 4 new mails"
//               color="inherit"
//             >
//               <Badge badgeContent={4} color="error">
//                 <MailIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               size="large"
//               aria-label="show 17 new notifications"
//               color="inherit"
//             >
//               <Badge badgeContent={17} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton> */}
//             <IconButton
//               size="large"
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               <AccountCircle />
//               <ExpandMoreIcon />
//             </IconButton>
//           </Box>
//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//       <div style={{}}>
//         <Drawer
//           variant="permanent"
//           open={open}
//           // PaperProps={{
//           //   sx: {
//           //     backgroundColor: "#212529",
//           //     color: "white",
//           //   },
//           // }}
//         >
//           <DrawerHeader>
//             {open ? (
//               <div>
//                 <div>
//                   <Box position sx={{}}>
//                     <List>
//                       <ListItem disablePadding sx={{ display: "block" }}>
//                         <ListItemButton
//                           onClick={handleClick}
//                           sx={{
//                             minHeight: 48,
//                             justifyContent: open ? "initial" : "center",
//                             // px: 2.5,
//                           }}
//                         >
//                           <Typography
//                             noWrap
//                             hidden={!open}
//                             sx={{ fontSize: 20, fontWeight: "bold" }}
//                           >
//                             Admin Dashboard
//                             {profileExpand ? (
//                               <ExpandLessIcon />
//                             ) : (
//                               <ExpandMoreIcon />
//                             )}
//                           </Typography>
//                         </ListItemButton>
//                       </ListItem>

//                       <Collapse in={profileExpand} timeout="auto" unmountOnExit>
//                         <List component="div" disablePadding>
//                           <NavLink to={"/profile"}>
//                             {({ isActive }) => (
//                               <ListItem
//                                 disablePadding
//                                 sx={{ display: "block" }}
//                                 style={{
//                                   backgroundColor: isActive ? "#C5C5C5" : "",
//                                 }}
//                               >
//                                 <ListItemButton
//                                   sx={{
//                                     minHeight: 48,
//                                     justifyContent: open ? "initial" : "center",
//                                     px: 2.5,
//                                   }}
//                                 >
//                                   <ListItemIcon
//                                     sx={{
//                                       minWidth: 0,
//                                       mr: open ? 3 : "auto",
//                                       justifyContent: "center",
//                                     }}
//                                   >
//                                     <GroupIcon />
//                                   </ListItemIcon>
//                                   <ListItemText
//                                     primary={"Profile"}
//                                     sx={{ opacity: open ? 1 : 0 }}
//                                   />
//                                 </ListItemButton>
//                               </ListItem>
//                             )}
//                           </NavLink>

//                           <NavLink to={"/logout"}>
//                             {({ isActive }) => (
//                               <ListItem
//                                 disablePadding
//                                 sx={{ display: "block" }}
//                                 style={{
//                                   backgroundColor: isActive ? "#C5C5C5" : "",
//                                 }}
//                               >
//                                 <ListItemButton
//                                   sx={{
//                                     minHeight: 48,
//                                     justifyContent: open ? "initial" : "center",
//                                     px: 2.5,
//                                   }}
//                                 >
//                                   <ListItemIcon
//                                     sx={{
//                                       minWidth: 0,
//                                       mr: open ? 3 : "auto",
//                                       justifyContent: "center",
//                                     }}
//                                   >
//                                     <LogoutRoundedIcon />
//                                   </ListItemIcon>
//                                   <ListItemText
//                                     primary={"Logout"}
//                                     sx={{ opacity: open ? 1 : 0 }}
//                                   />
//                                 </ListItemButton>
//                               </ListItem>
//                             )}
//                           </NavLink>
//                         </List>
//                       </Collapse>
//                     </List>
//                     <Divider />
//                   </Box>
//                 </div>
//               </div>
//             ) : (
//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="div"
//                 // style={{}}
//                 sx={{ ml: "60px", width: 200 }}
//               >
//                 {/* LOGO */}
//               </Typography>
//             )}
//           </DrawerHeader>

//           <Divider />
//           {!open ? (
//             <Box position sx={{}}>
//               <Divider />
//               <List>
//                 <ListItem disablePadding sx={{ display: "block" }}>
//                   <ListItemButton
//                     onClick={handleClick}
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? "initial" : "center",
//                       // px: 2.5,
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 2 : "auto",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <div>
//                         <div
//                           style={{
//                             borderRadius: "50%",
//                             border: "1px solid ",
//                             height: "50px",
//                             width: "50px",
//                             boxSizing: "border-box",
//                             position: "relative",
//                             overflow: "hidden",
//                           }}
//                         >
//                           <img
//                             src={"pic2"}
//                             alt="Profile"
//                             style={{
//                               position: "absolute",
//                               boxSizing: "border-box",
//                             }}
//                           />
//                         </div>
//                       </div>
//                     </ListItemIcon>

//                     <Typography noWrap hidden={!open} sx={{ fontSize: 20 }}>
//                       {loginData.shop_name}
//                       {profileExpand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                     </Typography>
//                   </ListItemButton>
//                 </ListItem>

//                 <Collapse in={profileExpand} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <NavLink to={"/profile"}>
//                       {({ isActive }) => (
//                         <ListItem
//                           disablePadding
//                           sx={{ display: "block" }}
//                           style={{
//                             backgroundColor: isActive ? "#C5C5C5" : "",
//                           }}
//                         >
//                           <ListItemButton
//                             sx={{
//                               minHeight: 48,
//                               justifyContent: open ? "initial" : "center",
//                               px: 2.5,
//                             }}
//                           >
//                             <ListItemIcon
//                               sx={{
//                                 minWidth: 0,
//                                 mr: open ? 3 : "auto",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               <GroupIcon />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={"Profile"}
//                               sx={{ opacity: open ? 1 : 0 }}
//                             />
//                           </ListItemButton>
//                         </ListItem>
//                       )}
//                     </NavLink>

//                     <NavLink to={"/logout"}>
//                       {({ isActive }) => (
//                         <ListItem
//                           disablePadding
//                           sx={{ display: "block" }}
//                           style={{
//                             backgroundColor: isActive ? "#C5C5C5" : "",
//                           }}
//                         >
//                           <ListItemButton
//                             sx={{
//                               minHeight: 48,
//                               justifyContent: open ? "initial" : "center",
//                               px: 2.5,
//                             }}
//                           >
//                             <ListItemIcon
//                               sx={{
//                                 minWidth: 0,
//                                 mr: open ? 3 : "auto",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               <LogoutRoundedIcon />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={"Logout"}
//                               sx={{ opacity: open ? 1 : 0 }}
//                             />
//                           </ListItemButton>
//                         </ListItem>
//                       )}
//                     </NavLink>
//                   </List>
//                 </Collapse>
//               </List>
//               <Divider />
//             </Box>
//           ) : (
//             []
//           )}
//           <Box>
//             <List>
//               {SideMenuItem.map((item, index) => (
//                 <NavLink
//                   to={item.path}
//                   key={index}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   {({ isActive }) => (
//                     <ListItem
//                       key={item}
//                       disablePadding
//                       sx={{ display: "block" }}
//                       style={{
//                         backgroundColor: isActive ? "#C5C5C5" : "",
//                       }}
//                     >
//                       <ListItemButton
//                         sx={{
//                           minHeight: 48,
//                           justifyContent: open ? "initial" : "center",
//                         }}
//                       >
//                         <ListItemIcon
//                           sx={{
//                             minWidth: 0,
//                             mr: open ? 3 : "auto",
//                             justifyContent: "center",
//                           }}
//                         >
//                           {item.icon}
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={item.name}
//                           sx={{ opacity: open ? 1 : 0 }}
//                         />
//                       </ListItemButton>
//                     </ListItem>
//                   )}
//                 </NavLink>
//               ))}
//             </List>
//           </Box>

//           <Divider />
//         </Drawer>
//       </div>
//       <Box component="main" sx={{ flexGrow: 1, m: 3, mt: 10 }}>
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }
