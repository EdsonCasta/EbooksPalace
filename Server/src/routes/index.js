const { Router } = require('express');
const allBooks = require('../controllers/getAllBooks');
const booksById = require('../controllers/getBooksById');
const { getAllUsers } = require("../controllers/getAllUsers");
const { getAllCarts } = require("../controllers/getAllCarts");
const createUser = require('../controllers/signUp');
const login = require('../controllers/login');
const { postNewBook } = require('../controllers/postNewBook');
const { verifyUser } = require("../controllers/verifyUser");
const cors = require("cors");
const { addToCart, updateCartItem, getCart } = require('../controllers/cartController');

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
router.post("/cart", addToCart);
router.put("/cart/:id", updateCartItem);
router.get("/cart/user/:userId", getCart);

module.exports = router;