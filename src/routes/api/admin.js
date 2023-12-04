const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/productController");
const orderController = require("../../controllers/admin/orderController");
const userController = require("../../controllers/admin/userController");
const categoryController = require("../../controllers/admin/categoryController");
const authController = require("../../controllers/admin/AuthController");
//login admin
router.post("/login", authController.loginAmin);
router.get("/authenticate/:token", authController.authAdmin);
//product
router.get("/products", productController.indexProduct);
router.get("/color_products", productController.getColorProduct);
router.get("/storage_products", productController.getStorageProduct);
router.post("/products/store", productController.storeProduct);
router.get("/products/create", productController.getAddProduct);
router.get("/products/edit/:product_id", productController.editProduct);
router.put("/products/update/:product_id", productController.updateProduct);
router.delete("/products/delete/:product_id", productController.deleteProduct);
router.get("/color_products/create", productController.getAddColorProduct);
router.get("/storage_products/create", productController.getAddStorageProduct);
router.post("/color_products/store", productController.storeColorProduct);
router.post("/storage_products/store", productController.storeStorageProduct);
//order
router.get("/orders", orderController.indexOrder);
router.put("/confirm_orders/:order_id", orderController.confirmOrder);
router.delete("/orders/delete/:order_id", orderController.deleteOrder);
//user
router.get("/users", userController.indexUser);
router.put("/users/update_role/:user_id", userController.updateUser);
router.put("/users/cancel_role/:user_id", userController.cancelRole);
router.delete("/users/delete/:user_id", userController.deleteUser);
//category
router.get("/categories", categoryController.indexCategory);
router.post("/categories/store", categoryController.storeCategory);
router.delete(
  "/categories/delete/:category_id",
  categoryController.deleteCategoy
);
module.exports = router;
