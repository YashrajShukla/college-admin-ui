import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";
import StudentsPage from "./pages/StudentsPage";
import AssignCoursePage from "./pages/AssignCoursePage";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/courses">
            Courses
          </Button>
          <Button color="inherit" component={Link} to="/students">
            Students
          </Button>
          <Button color="inherit" component={Link} to="/assign">
            Assign Course
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/assign" element={<AssignCoursePage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
export default App;
