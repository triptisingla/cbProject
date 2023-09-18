const { Product, User } = require("../models");

const getProducts = async (req, res) => {
    try {
        let products = await Product.findAll();
        console.log("user yhn h", req.user)
        return res.send(products)
    }
    catch (err) {
        res.send(err);
    }

}
const getProduct = async (req, res) => {
    try {
        let {productId} = req.query;
        // console.log("product is : ",productId)
        let product = await Product.findOne({ where: { id: productId } });
        // console.log("user yhn h", product)
        return res.send(product)
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
    const { productId } = req.body;
    console.log("product id : ", productId)
    let user = req.user;
    console.log("yaha par buy product", user)
    try {
        let balance = user.balance;

        let product = await Product.findOne({ where: { id: productId } })
        console.log("product ki quantity : ", product.quantity);
        if (product.quantity == 0) {
            return res.send("Product Out of stock")
        }
        if (product.price + 18 / 100 * product.price > balance) {
            return res.send("Not enough balance")
        }
        balance = balance - (product.price + 18 / 100 * product.price);

        let newQuantity = product.quantity - 1;
        await Product.update({ quantity: newQuantity }, { where: { id: productId } });
        let users = await User.update({ balance: balance }, { where: { id: user.id } });
        console.log("users h :", users)
        let products = await Product.findAll();
        console.log("products h :", products);
        console.log("balance h : ", balance);
        res.send({ products: products, balance: balance })
    }
    catch (err) {
        return res.send(err)
    }

}

const deleteProduct = async (req, res) => {
    try {

    }
    catch (err) {

    }
}


module.exports = {
    getProducts,
    addProduct,
    buyProduct,
    getProduct
}