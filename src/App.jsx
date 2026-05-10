import { Route, Routes, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Home from "./pages/Home";
import AddStudents from "./pages/AddStudents";
import EditStudent from "./pages/EditStudent";
import "./App.css";

export default function App() {
  return (
    <>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button component={Link} to="/add">Add</Button>
        </Toolbar>
      </AppBar>

      {/* Body */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudents />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </Container>
    </>
  );
}
