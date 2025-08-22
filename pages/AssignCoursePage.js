import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { saveData, loadData } from "../utils/storage";

const AssignSchema = Yup.object().shape({
  student: Yup.string().required("Select a student"),
  course: Yup.string().required("Select a course"),
});

function AssignCoursePage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setStudents(loadData("students"));
    setCourses(loadData("courses"));
    setAssignments(loadData("assignments"));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const updated = [...assignments, values];
    setAssignments(updated);
    saveData("assignments", updated);
    resetForm();
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Assign Course to Student
      </Typography>

      <Formik
        initialValues={{ student: "", course: "" }}
        validationSchema={AssignSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, errors, touched, resetForm }) => (
          <Form>
            <FormControl sx={{ mr: 2, mb: 2, minWidth: 200 }}>
              <InputLabel>Student</InputLabel>
              <Select
                name="student"
                value={values.student}
                onChange={handleChange}
                error={touched.student && Boolean(errors.student)}
              >
                {students.map((s, i) => (
                  <MenuItem key={i} value={s.firstName + " " + s.lastName}>
                    {s.firstName} {s.lastName}
                  </MenuItem>
                ))}
              </Select>
              {touched.student && errors.student && (
                <div style={{ color: "red", fontSize: "0.8em" }}>{errors.student}</div>
              )}
            </FormControl>

            <FormControl sx={{ mr: 2, mb: 2, minWidth: 200 }}>
              <InputLabel>Course</InputLabel>
              <Select
                name="course"
                value={values.course}
                onChange={handleChange}
                error={touched.course && Boolean(errors.course)}
              >
                {courses.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
              {touched.course && errors.course && (
                <div style={{ color: "red", fontSize: "0.8em" }}>{errors.course}</div>
              )}
            </FormControl>

            <br />
            <Button variant="contained" type="submit" sx={{ mr: 2 }}>
              Assign
            </Button>
            <Button variant="outlined" onClick={() => resetForm()}>
              Clear
            </Button>
          </Form>
        )}
      </Formik>

      <List sx={{ mt: 3 }}>
        {assignments.map((a, i) => (
          <Paper key={i} sx={{ p: 1, mb: 1 }}>
            <ListItem>
              <b>{a.student}</b> → {a.course}
            </ListItem>
          </Paper>
        ))}
      </List>
    </div>
  );
}
export default AssignCoursePage;
