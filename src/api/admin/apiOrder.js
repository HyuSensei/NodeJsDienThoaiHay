const axios = require("axios");
require("dotenv").config();

const indexOrder = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let success = req.flash("success");
    let data_order = await axios.get(process.env.BASE_URL + "admin/orders");
    return res.render("admin/order.ejs", {
      orders: data_order.data.orders,
      total_page: data_order.data.total_page,
      current_page: data_order.data.current_page,
      erro,
      success,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    let data = await axios.delete(
      process.env.BASE_URL + `admin/orders/delete/${order_id}`
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/orders`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/orders`);
  }
};

const confirmOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    let data = await axios.put(
      process.env.BASE_URL + `admin/confirm_orders/${order_id}`
    );
    console.log(data);
    if (data.data.success) {
      req.flash("success", `${data.data.message}`);
    }
    return res.redirect(`/admin/orders`);
  } catch (error) {
    console.log(error);
    if (error.response.data.detail) {
      req.flash("erro", `${error.response.data.detail}`);
    }
    return res.redirect(`/admin/orders`);
  }
};

module.exports = {
  indexOrder,
  deleteOrder,
  confirmOrder,
};
