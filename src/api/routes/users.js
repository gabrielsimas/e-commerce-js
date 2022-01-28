const { 
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../middlewares/verifyToken');
const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    //TODO: Find User by id first and then update only enable properties to avoid data corrupts
    /*TODO: create such validation as user is admin, case not do nothing, else permits such changes:
    - isAdmin: true | false    
    */
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString();
    }

    try {
        //TODO: Create a repository and then a service to execute this
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json(err)

    }
});

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        //TODO: Create a repository and then a service to execute this
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER
router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL USERS
//TODO: Implement Pagination of results
router.get('', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        //TODO: Create a repository and then a service to execute this        
        const users = query ? await User.find({ _id: -1 }).sort().limit(5) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
