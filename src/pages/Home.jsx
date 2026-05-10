import React, { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { data, Link, useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import CustomButton from "../components/CustomButton";
import useDebounce from "../hooks/useDebounce";
import { loadStudents, deleteStudent } from "../utils/storage";
import axios from "axios";

// card
// import { styled } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Home() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const debouncedQ = useDebounce(q, 300);

  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState(null);

  const [products, setProduct] = useState([]);

  useEffect(() => {
    setStudents(loadStudents());
  }, []);

  //api integration
  useEffect(() => {
    setLoadingQuote(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          setQuote({ text: item.title, author: item.category || "Unknown" });
        } else {
          setQuoteError("No data");
        }
      })
      .catch(() => setQuoteError("Failed to load"))
      .finally(() => setLoadingQuote(false));
  }, []);

  // api for card
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onDelete = (id) => {
    if (!confirm("Delete this student?")) return;
    deleteStudent(id);
    setStudents(loadStudents());
  };
  // unique key and memo save this think (course) for not repeat  code again
  const courses = useMemo(() => {
    const set = new Set(students.map((s) => s.course).filter(Boolean));
    return Array.from(set);
  }, [students]);

  // filter the search bar is name and , email mathch ?
  const filtered = useMemo(() => {
    const ql = debouncedQ.trim().toLowerCase();
    return students.filter((s) => {
      const matchQ =
        !ql ||
        s.name.toLowerCase().includes(ql) ||
        (s.email || "").toLowerCase().includes(ql);

      const matchCourse = !courseFilter || s.course === courseFilter;
      return matchQ && matchCourse;
    });
  }, [students, debouncedQ, courseFilter]);

  return (
    <div>
      {/* student manager */}
      <PageCard title="Student List">
        {/* Responsive container*/}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by name or email"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Courses</MenuItem>
              {courses.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <CustomButton fullWidth onClick={() => navigate("/add")}>
              Add Student
            </CustomButton>
          </Grid>
        </Grid>

        {/* responsive table  */}
        <TableContainer
          component={Paper}
          sx={{ width: "100%", overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Course</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.course}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/edit/${s.id}`}>
                      <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => onDelete(s.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </PageCard>

      {/* card */}
      <div className="row justify-content-center">
        {products.map((item) => (
          <div
            style={{ width: "fit-content" }}
            className="col-xl-4 col-12 col-lg-6 col-md-3"
          >
            <Card key={item.id} sx={{ maxWidth: 345, my: 3 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    A
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.title}
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>

              {/* <Collapse timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                  <Typography sx={{ marginBottom: 2 }}>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography sx={{ marginBottom: 2 }}>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography sx={{ marginBottom: 2 }}>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse> */}
            </Card>
          </div>
        ))}
      </div>

      {/* quote section or footer  */}
      <PageCard title="Quote of the Day">
        {loadingQuote && <Typography>Loading quote...</Typography>}
        {quoteError && <Typography color="error">{quoteError}</Typography>}

        {quote && (
          <Stack spacing={1}>
            <Typography variant="body1">"{quote.text}"</Typography>
            <Typography variant="caption">— {quote.author}</Typography>
          </Stack>
        )}
      </PageCard>
    </div>
  );
}
