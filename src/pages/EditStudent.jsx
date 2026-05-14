import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { getStudentById, updateStudent } from "../utils/storage";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const s = getStudentById(id);
    if (!s) {
      alert("Student not found");
      navigate("/");
      return;
    }
    setStudent(s);
    setName(s.name || "");
    setEmail(s.email || "");
    setCourse(s.course || "");
  }, [id]); 

  const onSubmit = (e) => {
    e?.preventDefault();
    if (!name.trim()) { alert("Name required"); return; }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) { alert("Valid email required"); return; }
    updateStudent(id, { name: name.trim(), email: email.trim(), course });
    navigate("/");
  };

  if (!student) return null;

  return (
    <PageCard title="Edit Student">
      <form onSubmit={onSubmit}>
        <CustomInput label="Name" value={name} onChange={e => setName(e.target.value)} />
        <CustomInput label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <FormControl fullWidth margin="normal">
          <InputLabel id="course-label">Course</InputLabel>
          <Select labelId="course-label" value={course} label="Course" onChange={e => setCourse(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="BCA">BCA</MenuItem>
            <MenuItem value="MCA">MCA</MenuItem>
            <MenuItem value="CS">CS</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
          </Select>
        </FormControl>
        <CustomButton type="submit">Update</CustomButton>
      </form>
    </PageCard>
  );
}
