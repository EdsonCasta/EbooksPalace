const { Router } = require('express');
const allBooks = require('../controllers/getAllBooks');
const booksById = require('../controllers/getBooksById');
const { getAllUsers } = require("../controllers/getAllUsers");
const { getAllCarts } = require("../controllers/getAllCarts");
const { putCartState } = require("../controllers/putCartState");
const { putUserAdmin } = require("../controllers/putUserAdmin")
const createUser = require('../controllers/signUp');
const login = require('../controllers/login');
const { postNewBook } = require('../controllers/postNewBook');
const { verifyUser } = require("../controllers/verifyUser");
const cors = require("cors");
const { addToCart } = require('../controllers/cartController');

const router = Router();
router.use(cors());

router.get('/books', allBooks);
router.get('/books/:id', booksById);
router.get('/users', getAllUsers);
router.get('/carts', getAllCarts);
router.post('/signup', createUser);
router.post('/login', login);
router.post('/books', postNewBook);
router.post('/userverify', verifyUser);
router.post('/cart', addToCart)

module.exports = router;