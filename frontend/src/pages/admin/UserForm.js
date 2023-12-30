import React, { useState, useEffect } from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as userServices from "../../controller/authController";

import SendIcon from "@mui/icons-material/Send";

// const genderItems = [
//   { id: "male", title: "Male" },
//   { id: "female", title: "Female" },
//   { id: "other", title: "Other" },
// ];

const initialFValues = {
  user_id: 0,
  user_name: "",
  user_email: "",
  user_mbno: "",
  password: "",
  cpassword: "",
  // gender: "male",
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function UserForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [status, setStatus] = useState(true);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("user_name" in fieldValues)
      temp.user_name = fieldValues.user_name ? "" : "This field is required.";
    if ("user_email" in fieldValues)
      temp.user_email = /$^|.+@.+..+/.test(fieldValues.user_email)
        ? ""
        : "Email is not valid.";

    if ("user_mbno" in fieldValues)
      temp.user_mbno =
        fieldValues.user_mbno.length > 9 ? "" : "Minimum 10 numbers required.";

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    if ("cpassword" in fieldValues)
      temp.cpassword = fieldValues.cpassword ? "" : "This field is required.";

    // if (fieldValues.password !== fieldValues.cpassword)
    //   temp.cpassword = "Passwords do not match.";
    // if ("departmentId" in fieldValues)

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      // console.log(values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // customerServices.insertCustomer(values);
      addOrEdit(values, resetForm);
      // console.log(values);
      // resetForm();
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setStatus(!status);
      setValues({
        ...recordForEdit,
        // password: "",
      });
      // setValues({
      //   ...values,
      //   password: "",
      // });
    }
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="user_name"
            label="User Name"
            value={values.user_name}
            onChange={handleInputChange}
            error={errors.user_name}
          />
          <Controls.Input
            label="User Email"
            name="user_email"
            value={values.user_email}
            onChange={handleInputChange}
            error={errors.user_email}
          />
          <Controls.Input
            label="User Mobile"
            name="user_mbno"
            value={values.user_mbno}
            onChange={handleInputChange}
            error={errors.user_mbno}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <Controls.Input
            label="Confirm Password"
            name="cpassword"
            value={values.cpassword}
            onChange={handleInputChange}
            error={errors.cpassword}
          />

          <div>
            {status ? (
              <Controls.Button type="submit" text="Submit" hidden={status} />
            ) : (
              <Controls.Button type="submit" text="Update" hidden={status} />
            )}
            {/* <Controls.Button type="submit" text="Submit" hidden={status} />*/}

            <Controls.Button text="Reset" color="default" onClick={resetForm} />

            {/* <Button
              size="large"
              color="primary"
              variant="contained"
              sx={{
                ...(!status && { display: "none" }),
              }}
              classes={{ root: classes.root, label: classes.label }}
            >
              Submit
            </Button>

            <Button
              size="large"
              color="warning"
              variant="contained"
              sx={{
                ...(!status && { display: "none" }),
              }}
              classes={{ root: classes.root, label: classes.label }}
            >
              Update
            </Button> */}
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
