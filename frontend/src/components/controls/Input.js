import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    height,
    rows,
    ...other
  } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      //   inputProps={{
      //     style: {
      //       height: "10px",
      //     },
      //   }}
      multiline
      rows={rows}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
