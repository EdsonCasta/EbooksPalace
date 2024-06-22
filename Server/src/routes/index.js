const { Router } = require('express');
const allBooks = require('../controllers/getAllBooks');
const { getAllUsers } = require("../controllers/getAllUsers");
const { getAllCarts } = require("../controllers/getAllCarts");
const booksById = require('../controllers/getBooksById');
const booksByName = require('../controllers/getBooksByName');
const { postNewBook } = require('../controllers/postNewBook');
const { verifyUser } = require("../controllers/verifyUser");
const pagination = require("../controllers/pagination");
const { filterByEditorial, filterByCategory, filterByAuthor } = require('../controllers/filters');
const { filterByPrice, sortBooksAlphabetically } = require('../controllers/filtersOrder');
const createUser = require('../controllers/signUp');
const login = require('../controllers/login');
const cors = require("cors");

const router = Router();
router.use(cors());

router.get('/books', allBooks);
router.get('/books/name', booksByName);
router.get('/books/:id', booksById);
router.get('/pagination', pagination);
router.get('/editorial', filterByEditorial);
router.get('/category', filterByCategory);
router.get('/author', filterByAuthor);
router.get('/price', filterByPrice);
router.get('/alphabetical/:order', sortBooksAlphabetically);
router.get('/users', getAllUsers);
router.get('/carts', getAllCarts);
router.post('/signup', createUser);
router.post('/login', login);
router.post('/books', postNewBook);
router.post('/userverify', verifyUser);

module.exports = router;