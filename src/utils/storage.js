// unique key  for transfering data 
const KEY = "student_manager_students_v1";

// get and show
export function loadStudents() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("loadStudents error", e);
    return [];
  }
}

// save student
export function saveStudents(students) {
  try {
    localStorage.setItem(KEY, JSON.stringify(students));
  } catch (e) {
    console.error("saveStudents error", e);
  }
}

// add student
export function addStudent(student) {
  const students = loadStudents();
  //unique id  by the date to string
  student.id = Date.now().toString();  
  students.push(student);
  saveStudents(students);
  return student;
}

// update 
export function updateStudent(id, updated) {
  const students = loadStudents().map((s) =>
    s.id === id ? { ...s, ...updated } : s
  );
  saveStudents(students);
  return students;
}

// delete
export function deleteStudent(id) {
  const students = loadStudents().filter((s) => s.id !== id);
  saveStudents(students);
  return students;
}

// get
export function getStudentById(id) {
  return loadStudents().find((s) => s.id === id) || null;
}
