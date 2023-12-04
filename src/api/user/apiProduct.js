const axios = require("axios");
require("dotenv").config();

const getProductHome = async (req, res) => {
  try {
    const product = await axios.get(process.env.BASE_URL + `products/home`);
    res.render("user/home.ejs", {
      product_ip: product.data.product_ip,
      product_xiao: product.data.product_xiao,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    let id = req.params.id;
    let erro = req.flash("erro");
    let success = req.flash("success");
    const data = await axios.get(
      process.env.BASE_URL + `products/detail/${id}`
    );
    return res.render("user/detail.ejs", {
      product: data.data.product,
      color: data.data.product.Colors,
      price: data.data.product.Prices,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProductSearch = async (req, res) => {
  try {
    const product_name = req.query.product_name;
    const page = req.query.page || 1;
    const url = process.env.BASE_URL + `products/search/${product_name}`;
    const params = {
      page,
    };
    let data = await axios.get(url, { params });
    let products = data.data.products;
    return res.render("user/search.ejs", {
      products: products,
      total_page: data.data.total_page,
      product_name: product_name,
      current_page: data.data.current_page,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductHome,
  getProductDetail,
  getProductSearch,
};
