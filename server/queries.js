const getUser = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.username = $1";
const addUser = "INSERT INTO users (username, password) VALUES ($1, $2)";
const getPassword = "SELECT password FROM users WHERE username= $1";

const getProducts = "SELECT * FROM products";
const addProducts = "INSERT INTO products (id,productname,price,quantity) VALUES ($1,$2,$3,$4)";
const getProductById = "SELECT * FROM products WHERE id = $1";
const buyProduct= "UPDATE products SET quantity=$1 WHERE id= $2";

module.exports = {
    getUser,
    getUserById,
    checkEmailExists,
    addUser,
    getPassword,
    getProducts,
    addProducts,
    getProductById,
    buyProduct,
}