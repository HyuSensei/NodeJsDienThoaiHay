const express = require("express");
const router = express.Router();
const apiProduct = require("../../api/admin/apiProduct");
const apiOrder = require("../../api/admin/apiOrder");
const apiUser = require("../../api/admin/apiUser");
const apiCategory = require("../../api/admin/apiCategory");
const apiAuth = require("../../api/admin/apiAuth");
const middleware = require("../../middleware/JWT");

//home
router.get(
  "/dashboard",
  middleware.checkRequireLoginAdmin,
  apiProduct.indexProduct
);
router.get(
  "/products",
  middleware.checkRequireLoginAdmin,
  apiProduct.paginateProduct
);
router.get(
  "/color_products",
  middleware.checkRequireLoginAdmin,
  apiProduct.paginateColorProduct
);
router.get(
  "/storage_products",
  middleware.checkRequireLoginAdmin,
  apiProduct.paginateStorageProduct
);
//login
router.post("/login", apiAuth.handleLoginAdmin);
router.get("/", middleware.checkLoginAdmin);
router.get("/logout", (req, res) => {
  res.cookie("tokenAdmin", "", { maxAge: 0 });
  res.cookie("AdminId", "", { maxAge: 0 });
  return res.redirect("/admin");
});

//product
router.get(
  "/products/create",
  middleware.checkRequireLoginAdmin,
  apiProduct.getAddProduct
);
router.get(
  "/products/edit/:product_id",
  middleware.checkRequireLoginAdmin,
  apiProduct.editProduct
);
router.post(
  "/products/store",
  middleware.checkRequireLoginAdmin,
  apiProduct.storeProduct
);
router.post(
  "/products/update",
  middleware.checkRequireLoginAdmin,
  apiProduct.updateProduct
);
router.get(
  "/products/delete/:product_id",
  middleware.checkRequireLoginAdmin,
  apiProduct.deleteProduct
);
router.get(
  "/color_products/create",
  middleware.checkRequireLoginAdmin,
  apiProduct.getColorProduct
);
router.get(
  "/storage_products/create",
  middleware.checkRequireLoginAdmin,
  apiProduct.getStorageProduct
);
router.post(
  "/color_products/store",
  middleware.checkRequireLoginAdmin,
  apiProduct.storeColorProduct
);
router.post(
  "/storage_products/store",
  middleware.checkRequireLoginAdmin,
  apiProduct.storeStorageProduct
);
//order
router.get("/orders", apiOrder.indexOrder);
router.get(
  "/confirm_orders/:order_id",
  middleware.checkRequireLoginAdmin,
  apiOrder.confirmOrder
);
router.get(
  "/orders/delete/:order_id",
  middleware.checkRequireLoginAdmin,
  apiOrder.deleteOrder
);
//user
router.get("/users", apiUser.indexUser);
router.get(
  "/users/update_role/:user_id",
  middleware.checkRequireLoginAdmin,
  apiUser.updateUser
);
router.get(
  "/users/cancel_role/:user_id",
  middleware.checkRequireLoginAdmin,
  apiUser.cancelRole
);
router.get(
  "/users/delete/:user_id",
  middleware.checkRequireLoginAdmin,
  apiUser.deleteUser
);
//category
router.get(
  "/categories",
  middleware.checkRequireLoginAdmin,
  apiCategory.indexCategory
);
router.post(
  "/categories/store",
  middleware.checkRequireLoginAdmin,
  apiCategory.storeCategory
);
router.get(
  "/categories/delete/:category_id",
  middleware.checkRequireLoginAdmin,
  apiCategory.deleteCategory
);
module.exports = router;
