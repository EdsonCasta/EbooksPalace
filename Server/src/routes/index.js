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
const { addToCart, removeItems } = require("../controllers/cartController");
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
router.post('/remove', removeItems);
router.put('/carts/:id/status', putCartState);
router.put('/users/:id/status/admin', putUserAdmin);
router.put('/users/:id/status/ban', putUserBan);
router.put('/users/:id/status/customer', putUserCustomer);

router.post('/create-checkout-session', async (req, res) => {
    try {
        const items = req.body; // Recibe los ítems del carrito del frontend

        // Mapear los ítems del carrito a los line items de Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image]
                },
                unit_amount: item.price * 100, // Stripe usa centavos
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
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