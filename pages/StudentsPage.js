import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, List, ListItem, Paper, Typography, Avatar } from "@mui/material";
import { saveData, loadData } from "../utils/storage";

const StudentSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dob: Yup.string().required("Required"),
  photo: Yup.mixed().required("Photo is required"),
});

function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(loadData("students"));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const updated = [...students, values];
    setStudents(updated);
    saveData("students", updated);
    resetForm();
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Add Student
      </Typography>

      <Formik
        initialValues={{ firstName: "", lastName: "", dob: "", photo: "" }}
        validationSchema={StudentSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, setFieldValue, values, errors, touched, resetForm }) => (
          <Form>
            <TextField
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ mr: 2, mb: 2 }}
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ mb: 2 }}
            />
            <br />
            <TextField
              type="date"
              name="dob"
              label="Date of Birth"
              value={values.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={touched.dob && Boolean(errors.dob)}
              helperText={touched.dob && errors.dob}
              sx={{ mr: 2, mb: 2 }}
            />
            <br />
            
            <input
              accept="image/*"
              type="file"
              capture="environment"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFieldValue("photo", reader.result); // Base64 string
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {touched.photo && errors.photo && (
              <div style={{ color: "red", fontSize: "0.8em" }}>{errors.photo}</div>
            )}
            {values.photo && (
              <div style={{ marginTop: 10 }}>
                <Avatar src={values.photo} sx={{ width: 80, height: 80 }} />
              </div>
            )}

            <br />
            <Button variant="contained" type="submit" sx={{ mr: 2 }}>
              Add Student
            </Button>
            <Button variant="outlined" onClick={() => resetForm()}>
              Clear
            </Button>
          </Form>
        )}
      </Formik>

      <List sx={{ mt: 3 }}>
        {students.map((s, i) => (
          <Paper key={i} sx={{ p: 1, mb: 1, display: "flex", alignItems: "center" }}>
            <Avatar src={s.photo} sx={{ width: 40, height: 40, mr: 2 }} />
            <ListItem sx={{ p: 0 }}>
              {s.firstName} {s.lastName} ({s.dob})
            </ListItem>
          </Paper>
        ))}
      </List>
    </div>
  );
}
export default StudentsPage;
