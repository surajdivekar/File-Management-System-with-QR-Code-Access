import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Controls from "./controls/Controls";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "right",
  },
}));

export default function ViewPopup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
      onClose={handleClose}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Controls.ActionButton color="secondary" onClick={handleClose}>
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
