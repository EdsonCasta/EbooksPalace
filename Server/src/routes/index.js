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
const { addToCart } = require("../controllers/cartController");
const { getCategories } = require('../controllers/categoryController');

const stripe = require('stripe')('sk_test_51PUuD2P5B5kABXMb7qMmwaVcVSPvwoFGdllwCaaprxdcNKBeC4REXwKoQu2yGVYHDu6jKNONCG5GONOu989FnGt500n4RiJkmt');
const YOUR_DOMAIN = 'http://localhost:5173';
const router = Router();

router.use(cors());

router.get('/books', allBooks);
router.get('/books/:id', booksById);
router.get('/users', getAllUsers);
router.get('/carts', getAllCarts);
router.get('/categories', getCategories)
router.post('/signup', createUser);
router.post('/login', login);
router.post('/books', postNewBook);
router.post('/userverify', verifyUser);
router.post('/cart', addToCart);
router.put('/carts/:id/status', putCartState);
router.put('/users/:id/status/admin', putUserAdmin);
router.put('/users/:id/status/ban', putUserBan);
router.put('/users/:id/status/customer', putUserCustomer);

router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1PUyaPP5B5kABXMbkCe9eLqW',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;