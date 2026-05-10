import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import CustomButton from "../components/CustomButton";
import { addStudent } from "../utils/storage";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import CustomInput from "../components/customInput";

export default function AddStudent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const onSubmit = (e) => {
    e?.preventDefault();
    // simple validation
    if (!name.trim()) { alert("Name required"); return; }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) { alert("Valid email required"); return; }

    addStudent({ name: name.trim(), email: email.trim(), course });
    navigate("/");
  };

  return (
    <PageCard title="Add Student">
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

        <CustomButton type="submit">Save</CustomButton>
      </form>
    </PageCard>
  );
}
