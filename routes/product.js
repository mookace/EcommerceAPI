const Product = require("../models/Product");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//Create Product

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        color: req.body.color,
        size: req.body.size,
        stock: req.body.stock,
        material: req.body.material,


    })
    if (req.file) {
        newProduct.img = req.file.path
    }

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);

    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE Products
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});



//Delete Products

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been successfully deleted...")

    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Products

router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Get All Users

router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            products = await Product.find({
                category: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }



        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});






module.exports = router;