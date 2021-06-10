var express = require("express");
var router = express.Router();

const { isSignIn, isAuthenticate } = require("../controller/auth");
const { getUserById } = require("../controller/user");
const {
  getProductid,
  getproduct,
  createproduct,
  photo,

  getallproduct,
} = require("../controller/product");
//params
router.param("productId", getProductid);
router.param("userId", getUserById);
//read
router.get("/product/a/:productId", getproduct);
router.get("/product/photo/:productId", photo);
router.get("/products", getallproduct);
//create
router.post("/product/create/:userId", isSignIn, isAuthenticate, createproduct);
//update
module.exports = router;
