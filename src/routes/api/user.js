const express = require("express");
const router = express.Router();

const productController = require("../../controllers/user/productController");
const authController = require("../../controllers/user/authController");
const orderController = require("../../controllers/user/orderController");
const middleware = require("../../middleware/JWT");

router.get("/products/home", productController.getProductHome);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/authenticate/:token", authController.authLogin);

router.post("/order", orderController.addOrder);
router.get("/orderWait/:user_id", orderController.getOrderWait);
router.get("/orderShip/:user_id", orderController.getOrderShip);
router.get("/orderComplete/:user_id", orderController.getOrderComplete);
router.get("/orderCancel/:user_id", orderController.getOrderCancel);

router.get("/products/detail/:id", productController.getProductDetail);
router.get(
  "/products/detail/:id/:storage_id",
  productController.getProductDetailCart
);

module.exports = router;
