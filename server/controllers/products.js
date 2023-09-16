const { Product } = require("../models");

const getProducts = async (req, res) => {
    try {
        let products = await Product.findAll();
        return res.send(products)
    }
    catch (err) {
        res.send(err);
    }

}

const addProduct = async (req, res) => {
    const { productName, price, quantity } = req.body;

    try {
        let products = await Product.create({ productName, price, quantity });
        return res.send(products);
    }
    catch (err) {
        return res.send(err);
    }
}

const buyProduct = async (req, res) => {
    const { id } = req.body;
    console.log(id)

    try {
        let product = await Product.findOne({ where: { id } })
        console.log(product.quantity);
        if (product.quantity == 0) {
            return res.send("Product Out of stock")
        }
        let newQuantity = product.quantity - 1;
        let products = await Product.update({ quantity: newQuantity }, { where: { id:id } });
        res.send(products)
    }
    catch (err) {
        return res.send(err)
    }

}

const deleteProduct=async(req,res)=>{
    try{

    }
    catch(err)
    {
        
    }
}


module.exports = {
    getProducts,
    addProduct,
    buyProduct
}