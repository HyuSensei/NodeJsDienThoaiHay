const axios = require("axios");
require("dotenv").config();

const getProductCategory = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let params = {
      page,
    };
    const category_id = req.params.category_id;
    const product = await axios.get(
      process.env.BASE_URL + `categories/${category_id}`,
      { params }
    );
    res.render("user/category.ejs", {
      products: product.data.products,
      categories: product.data.categories,
      total_page: product.data.total_page,
      current_page: product.data.current_page,
      category_id: category_id,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductCategory,
};
