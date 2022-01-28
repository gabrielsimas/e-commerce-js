const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../middlewares/verifyToken');
const router = require('express').Router();
const Product = require('../models/Product');
const CryptoJS = require('crypto-js');


// CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const saveProduct = await newProduct.save();
        res.status(201).json(saveProduct);
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
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json(err)

    }
});

// GET PRODUCT
//TODO: Add User token validation!
router.get('/:id', async (req, res) => {
    try {
        //TODO: Create a repository and then a service to execute this
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL PRODUCTS
//TODO: Add User token validation!
//TODO: Adds queries by more and less prices
//TODO: Implement Pagination of results
router.get('', async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;

    try {
        //TODO: Create a repository and then a service to execute this        
        let products;
        
        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }else if(queryCategory) {
            products = await Product.find({
                categories:{
                    $in: [queryCategory],
                },
            });
        }else{
            products = await Product.find();
        }
        
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
