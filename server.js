import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// In-memory student data (acts as a database)
let students = [
  { id: 1, firstName: 'Dharshini', lastName: 'Dinakaran', name: 'Dharshini Dinakaran', email: 'dharshini@college.edu', course: 'B.Tech IT', phone: '9876543210', address: 'Chennai' },
  { id: 2, firstName: 'Santhosh', lastName: 'Kumar', name: 'Santhosh Kumar', email: 'Santhosh@college.edu', course: 'B.Tech IT', phone: '9876500000', address: 'Hyderabad' },
  { id: 3, firstName: 'Priya', lastName: 'Sharma', name: 'Priya Sharma', email: 'Priya@college.edu', course: 'B.Tech CSE', phone: '9876511111', address: 'Chennai' },
  { id: 4, firstName: 'Kavya', lastName: 'Ravi', name: 'Kavya Ravi', email: 'kavya@college.edu', course: 'B.Sc IT', phone: '9876522222', address: 'Coimbatore' },
  { id: 5, firstName: 'Sandhiya', lastName: 'Krishnan', name: 'Sandhiya Krishnan', email: 'Sandhiya@college.edu', course: 'MCA', phone: '9876533333', address: 'Bangalore' },
];
let nextId = 6;

// GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

// POST - create new student
app.post('/students', (req, res) => {
  const student = { id: nextId++, ...req.body };
  students.push(student);
  res.status(201).json(student);
});

// PUT - update student
app.put('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });
  students[index] = { ...students[index], ...req.body };
  res.json(students[index]);
});

// DELETE student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });
  students.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});