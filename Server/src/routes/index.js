const { Router } = require('express');
const allBooks = require('../controllers/getAllBooks');
const booksById = require('../controllers/getBooksById');
const booksByName = require('../controllers/getBooksByName');
const { postNewBook } = require('../controllers/postNewBook');
const createUser = require('../controllers/signUp');
const login = require('../controllers/login');
const cors = require("cors");

const router = Router();
router.use(cors());

router.get('/books', allBooks);
router.get('/books/name', booksByName);
router.get('/books/:id', booksById);
router.post('/signup', createUser);
router.post('/login', login);
router.post('/books', postNewBook)

module.exports = router;