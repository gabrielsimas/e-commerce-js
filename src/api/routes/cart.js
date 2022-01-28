const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken
} = require('../middlewares/verifyToken');
const router = require('express').Router();
const Cart = require('../models/Cart');
const CryptoJS = require('crypto-js');


// CREATE

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const saveCart = await newCart.save();
        res.status(201).json(saveCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    //TODO: Find User by id first and then update only enable properties to avoid data corrupts
    /*TODO: create such validation as user is admin, case not do nothing, else permits such changes:
    - isAdmin: true | false    
    */

    try {
        //TODO: Create a repository and then a service to execute this
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json(err)

    }
});

// GET USER CART
//TODO: Add User token validation!
router.get('/:userId',verifyTokenAndAuthorization, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL
router.get("", verifyTokenAndAdmin, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
