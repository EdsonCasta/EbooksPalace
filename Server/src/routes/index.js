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
const { putUserBan } = require('../controllers/putUserBanned');
const { putUserCustomer } = require('../controllers/putUserCustomer');

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
router.put('/carts/:id/status', putCartState);
router.put('/users/:id/status/admin', putUserAdmin);
router.put('/users/:id/status/ban', putUserBan);
router.put('/users/:id/status/customer', putUserCustomer);

module.exports = router;