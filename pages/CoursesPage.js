import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, List, ListItem, Paper, Typography } from "@mui/material";
import { saveData, loadData } from "../utils/storage";

const CourseSchema = Yup.object().shape({
  course: Yup.string().required("Course name is required"),
});

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(loadData("courses"));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const updated = [...courses, values.course];
    setCourses(updated);
    saveData("courses", updated);
    resetForm();
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Add Course
      </Typography>

      <Formik
        initialValues={{ course: "" }}
        validationSchema={CourseSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, errors, touched, resetForm }) => (
          <Form>
            <TextField
              name="course"
              label="Course Name"
              value={values.course}
              onChange={handleChange}
              error={touched.course && Boolean(errors.course)}
              helperText={touched.course && errors.course}
              sx={{ mr: 2, mb: 2 }}
            />
            <Button variant="contained" type="submit" sx={{ mr: 2 }}>
              Add Course
            </Button>
            <Button variant="outlined" onClick={() => resetForm()}>
              Clear
            </Button>
          </Form>
        )}
      </Formik>

      <List sx={{ mt: 3 }}>
        {courses.map((c, i) => (
          <Paper key={i} sx={{ p: 1, mb: 1 }}>
            <ListItem>{c}</ListItem>
          </Paper>
        ))}
      </List>
    </div>
  );
}
export default CoursesPage;
