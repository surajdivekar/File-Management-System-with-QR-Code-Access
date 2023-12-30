import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function Button(props) {
  const { text, size, color, variant, hidden, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      //   color={color || "success"}
      onClick={onClick}
      sx={{
        ...(hidden && { display: "none" }),
      }}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}
