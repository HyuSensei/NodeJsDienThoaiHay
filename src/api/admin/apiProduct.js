const axios = require("axios");
require("dotenv").config();
const multer = require("multer");
const fs = require("fs");

const indexProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let data_product = await axios.get(process.env.BASE_URL + "admin/products");
    let data_color_product = await axios.get(
      process.env.BASE_URL + "admin/color_products"
    );
    let data_storage_product = await axios.get(
      process.env.BASE_URL + "admin/storage_products"
    );
    return res.render("admin/dashboard.ejs", {
      products: data_product.data.products,
      color_products: data_color_product.data.color_products,
      storage_products: data_storage_product.data.storage_products,
      total_page_product: data_product.data.total_page,
      current_page_product: data_product.data.current_page,
      total_page_color_product: data_color_product.data.total_page,
      current_page_color_product: data_color_product.data.current_page,
      total_page_storage_product: data_storage_product.data.total_page,
      current_page_storage_product: data_storage_product.data.current_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginateProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let page = req.query.page || 1;
    let params = {
      page,
    };
    let data_product = await axios.get(
      process.env.BASE_URL + "admin/products",
      { params }
    );
    let data_color_product = await axios.get(
      process.env.BASE_URL + "admin/color_products"
    );
    let data_storage_product = await axios.get(
      process.env.BASE_URL + "admin/storage_products"
    );
    return res.render("admin/dashboard.ejs", {
      products: data_product.data.products,
      color_products: data_color_product.data.color_products,
      storage_products: data_storage_product.data.storage_products,
      total_page_product: data_product.data.total_page,
      current_page_product: data_product.data.current_page,
      total_page_color_product: data_color_product.data.total_page,
      current_page_color_product: data_color_product.data.current_page,
      total_page_storage_product: data_storage_product.data.total_page,
      current_page_storage_product: data_storage_product.data.current_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginateColorProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let page = req.query.page || 1;
    let params = {
      page,
    };
    let data_product = await axios.get(process.env.BASE_URL + "admin/products");
    let data_color_product = await axios.get(
      process.env.BASE_URL + "admin/color_products",
      { params }
    );
    let data_storage_product = await axios.get(
      process.env.BASE_URL + "admin/storage_products"
    );
    return res.render("admin/dashboard.ejs", {
      products: data_product.data.products,
      color_products: data_color_product.data.color_products,
      storage_products: data_storage_product.data.storage_products,
      total_page_product: data_product.data.total_page,
      current_page_product: data_product.data.current_page,
      total_page_color_product: data_color_product.data.total_page,
      current_page_color_product: data_color_product.data.current_page,
      total_page_storage_product: data_storage_product.data.total_page,
      current_page_storage_product: data_storage_product.data.current_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginateStorageProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let page = req.query.page || 1;
    let params = {
      page,
    };
    let data_product = await axios.get(process.env.BASE_URL + "admin/products");
    let data_color_product = await axios.get(
      process.env.BASE_URL + "admin/color_products"
    );
    let data_storage_product = await axios.get(
      process.env.BASE_URL + "admin/storage_products",
      { params }
    );
    return res.render("admin/dashboard.ejs", {
      products: data_product.data.products,
      color_products: data_color_product.data.color_products,
      storage_products: data_storage_product.data.storage_products,
      total_page_product: data_product.data.total_page,
      current_page_product: data_product.data.current_page,
      total_page_color_product: data_color_product.data.total_page,
      current_page_color_product: data_color_product.data.current_page,
      total_page_storage_product: data_storage_product.data.total_page,
      current_page_storage_product: data_storage_product.data.current_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./src/public/images/products");
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const storeProduct = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      try {
        if (req.file) {
          image = req.file.originalname;
        } else {
          image = "";
        }
        const data_product = {
          name: req.body.name,
          image: image,
          price: req.body.price,
          screen: req.body.screen,
          resolution: req.body.resolution,
          rear_camera: req.body.rear_camera,
          front_camera: req.body.front_camera,
          cpu: req.body.cpu,
          pin: req.body.pin,
          sim: req.body.sim,
          category_id: req.body.category_id,
          color_id: req.body.color_id,
          storage_id: req.body.storage_id,
        };
        let data = await axios.post(
          process.env.BASE_URL + "admin/products/store",
          data_product
        );
        console.log(data);
        if (data.data.success) {
          req.flash("success", `${data.data.message}`);
        }
        return res.redirect("/admin/products/create");
      } catch (error) {
        console.log(error);
        if (error.response.data.detail) {
          req.flash("erro", `${error.response.data.detail}`);
        }
        return res.redirect("/admin/products/create");
      }
    });
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      fs.unlinkSync(req.file.path);
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect("/admin/products/create");
  }
};

const getAddProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let data = await axios.get(process.env.BASE_URL + "admin/products/create");
    return res.render("admin/create_product.ejs", {
      categories: data.data.categories,
      colors: data.data.colors,
      storages: data.data.storages,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let product_id = req.params.product_id;
    let product = await axios.get(
      process.env.BASE_URL + `admin/products/edit/${product_id}`
    );
    return res.render("admin/edit_product.ejs", {
      product: product.data.product,
      categories: product.data.categories,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect("/admin/dashboard");
  }
};

const updateProduct = (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      const product_id = req.body.id;
      try {
        if (req.file) {
          image = req.file.originalname;
        } else {
          image = "";
        }
        const data_product = {
          name: req.body.name,
          image: image,
          price: req.body.price,
          screen: req.body.screen,
          resolution: req.body.resolution,
          rear_camera: req.body.rear_camera,
          front_camera: req.body.front_camera,
          cpu: req.body.cpu,
          pin: req.body.pin,
          sim: req.body.sim,
          category_id: req.body.category_id,
        };
        let data = await axios.put(
          process.env.BASE_URL + `admin/products/update/${product_id}`,
          data_product
        );
        console.log(data);
        if (data.data.success) {
          req.flash("success", `${data.data.message}`);
        }
        return res.redirect(`/admin/products/edit/${product_id}`);
      } catch (error) {
        console.log(error);
        if (error.response.data.detail) {
          req.flash("erro", `${error.response.data.detail}`);
        }
        return res.redirect(`/admin/products/edit/${product_id}`);
      }
    });
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      fs.unlinkSync(req.file.path);
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/products/edit/${product_id}`);
  }
};

const deleteProduct = async (req, res) => {
  try {
    let product_id = req.params.product_id;
    let data = await axios.delete(
      process.env.BASE_URL + `admin/products/delete/${product_id}`
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/products`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/products`);
  }
};

const getColorProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let data = await axios.get(
      process.env.BASE_URL + "admin/color_products/create"
    );
    return res.render("admin/create_color_product.ejs", {
      products: data.data.products,
      colors: data.data.colors,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStorageProduct = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let data = await axios.get(
      process.env.BASE_URL + "admin/storage_products/create"
    );
    return res.render("admin/create_storage_product.ejs", {
      products: data.data.products,
      storages: data.data.storages,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeColorProduct = async (req, res) => {
  try {
    let data = await axios.post(
      process.env.BASE_URL + "admin/color_products/store",
      req.body
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/color_products/create`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/color_products/create`);
  }
};

const storeStorageProduct = async (req, res) => {
  try {
    let data = await axios.post(
      process.env.BASE_URL + "admin/storage_products/store",
      req.body
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/storage_products/create`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/storage_products/create`);
  }
};

module.exports = {
  indexProduct,
  storeProduct,
  getAddProduct,
  paginateProduct,
  paginateColorProduct,
  paginateStorageProduct,
  editProduct,
  updateProduct,
  deleteProduct,
  getColorProduct,
  getStorageProduct,
  storeColorProduct,
  storeStorageProduct,
};
