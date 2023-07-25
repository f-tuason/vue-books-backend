import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import { login, register, addBook, deleteBook } from './firebase.js';

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'POST,GET,PUT,DELETE',
  credentials: true
}));

app.use(session({
  secret: 'secrete code a9b8c7',
  resave: true,
  saveUninitialized: true
}))

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  res.status(204).json({ message: 'an Server Error occured' })
})

// root route (this is just for testing only)
//app.get('/', (req, res) => {
//  res.render('index.html');
//})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const ret = await login(email, password)
    res.status(200).json(ret)
  } catch(err) {
    res.status(401).json({ message: err.message })
  }
})

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const ret = register(email, password)
    res.status(201).json(ret)
  } catch(err) {
    res.status(401).json({ message: 'Register failed' })
  }
})

app.post('/add', async (req, res) => {
  try {
    const { title, author } = req.body
    const ret = await addBook(title, author)
    res.status(200).json({ message: ret })
  } catch(err) {
    res.status(401).json({ message: 'Add book failed' })
  }
})

app.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body
    const ret = await deleteBook(id)
    res.status(200).json({ message: ret })
  } catch(err) {
    res.status(401).json({ message: 'Delete book failed' })
  }
})

app.listen(3000, () => {
  console.log(`Listening on port: ${port}`)
})