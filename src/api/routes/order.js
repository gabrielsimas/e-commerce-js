const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken
} = require('../middlewares/verifyToken');
const router = require('express').Router();
const Order = require('../models/Order');
const CryptoJS = require('crypto-js');


// CREATE

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const saveOrder = await newOrder.save();
        res.status(201).json(saveOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    //TODO: Find User by id first and then update only enable properties to avoid data corrupts
    /*TODO: create such validation as user is admin, case not do nothing, else permits such changes:
    - isAdmin: true | false    
    */

    try {
        //TODO: Create a repository and then a service to execute this
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json(err)

    }
});

// GET USER ORDERS
//TODO: Add User token validation!
router.get('/:userId',verifyTokenAndAuthorization, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL ORDERS
router.get("", verifyTokenAndAdmin, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
