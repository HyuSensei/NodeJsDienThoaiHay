const db = require("../../models/index");

const addOrder = async (req, res) => {
  try {
    let cart = req.body.cart;
    if (cart.length === 0) {
      return res.status(400).json({
        detail: "Vui lòng thêm sản phẩm vào giỏ hàng để đặt hàng !",
      });
    } else {
      if (
        !req.body.user.name ||
        !req.body.user.phone ||
        !req.body.user.address
      ) {
        return res.status(400).json({
          detail: "Vui lòng điền đầy đủ thông tin đặt hàng !",
        });
      } else {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
          total = cart[i].price * cart[i].quantity;
        }
        let userOrder = req.body.user;
        let orderInsert = await db.Order.create({
          status: 0,
          name: userOrder.name,
          address: userOrder.address,
          phone: userOrder.phone,
          total: total,
          UserId: userOrder.user_id,
        });
        for (let i = 0; i < cart.length; i++) {
          await db.Order_Product.create({
            ProductId: cart[i].id,
            OrderId: orderInsert.id,
            color: cart[i].color,
            option: cart[i].storage,
            price_product: cart[i].price,
            quantity: cart[i].quantity,
          });
        }
        return res.status(200).json({
          success: true,
          message: "Đặt hàng thành công !",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const checkMaxOrder = async (order_id) => {
  try {
    let data = await db.Order_Product.findOne({
      attributes: ["ProductId"],
      where: { OrderId: order_id },
      order: [["id", "DESC"]],
      limit: 1,
      raw: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getOrderWait = async (req, res) => {
  try {
    let listLastProduct = [];
    let user_id = req.params.user_id;
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: [
            "id",
            "OrderId",
            "ProductId",
            "color",
            "option",
            "price_product",
            "quantity",
          ],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: user_id,
        status: 0,
      },
    });
    res_order = [];
    listLastProduct = [];
    for (const order of data) {
      let checkOrderProduct = await checkMaxOrder(order.id);
      for (const orderProduct of order.Order_Products) {
        if (checkOrderProduct.ProductId === orderProduct.ProductId) {
          lastProduct = orderProduct.ProductId;
          listLastProduct.push(lastProduct);
        }
        const order_data = {
          id: order.id,
          status: order.status,
          name: order.name,
          address: order.address,
          phone: order.phone,
          user_id: order.UserId,
          total: order.total,
          product_id: orderProduct.ProductId,
          quantity: orderProduct.quantity,
          product_price: orderProduct.price_product,
          product_name: orderProduct.Product.name,
          color: orderProduct.color,
          option: orderProduct.option,
          product_image: orderProduct.Product.image,
        };
        res_order.push(order_data);
      }
    }
    return res.status(200).json({
      message: "Thông tin đơn hàng đang chờ duyệt !",
      order: res_order,
      last_product: listLastProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderShip = async (req, res) => {
  try {
    let listLastProduct = [];
    let user_id = req.params.user_id;
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: [
            "id",
            "OrderId",
            "ProductId",
            "color",
            "option",
            "price_product",
            "quantity",
          ],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: user_id,
        status: 1,
      },
    });
    res_order = [];
    listLastProduct = [];
    for (const order of data) {
      let checkOrderProduct = await checkMaxOrder(order.id);
      for (const orderProduct of order.Order_Products) {
        if (checkOrderProduct.ProductId === orderProduct.ProductId) {
          lastProduct = orderProduct.ProductId;
          listLastProduct.push(lastProduct);
        }
        const order_data = {
          id: order.id,
          status: order.status,
          name: order.name,
          address: order.address,
          phone: order.phone,
          user_id: order.UserId,
          total: order.total,
          product_id: orderProduct.ProductId,
          quantity: orderProduct.quantity,
          product_price: orderProduct.price_product,
          product_name: orderProduct.Product.name,
          color: orderProduct.color,
          option: orderProduct.option,
          product_image: orderProduct.Product.image,
        };
        res_order.push(order_data);
      }
    }
    return res.status(200).json({
      message: "Thông tin đơn hàng đang vận chuyển !",
      order: res_order,
      last_product: listLastProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderComplete = async (req, res) => {
  try {
    let listLastProduct = [];
    let user_id = req.params.user_id;
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: [
            "id",
            "OrderId",
            "ProductId",
            "color",
            "option",
            "price_product",
            "quantity",
          ],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: user_id,
        status: 2,
      },
    });
    res_order = [];
    listLastProduct = [];
    for (const order of data) {
      let checkOrderProduct = await checkMaxOrder(order.id);
      for (const orderProduct of order.Order_Products) {
        if (checkOrderProduct.ProductId === orderProduct.ProductId) {
          lastProduct = orderProduct.ProductId;
          listLastProduct.push(lastProduct);
        }
        const order_data = {
          id: order.id,
          status: order.status,
          name: order.name,
          address: order.address,
          phone: order.phone,
          user_id: order.UserId,
          total: order.total,
          product_id: orderProduct.ProductId,
          quantity: orderProduct.quantity,
          product_price: orderProduct.price_product,
          product_name: orderProduct.Product.name,
          color: orderProduct.color,
          option: orderProduct.option,
          product_image: orderProduct.Product.image,
        };
        res_order.push(order_data);
      }
    }
    return res.status(200).json({
      message: "Thông tin đơn hàng đã giao !",
      order: res_order,
      last_product: listLastProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderCancel = async (req, res) => {
  try {
    let listLastProduct = [];
    let user_id = req.params.user_id;
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: [
            "id",
            "OrderId",
            "ProductId",
            "color",
            "option",
            "price_product",
            "quantity",
          ],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: user_id,
        status: 3,
      },
    });
    res_order = [];
    listLastProduct = [];
    for (const order of data) {
      let checkOrderProduct = await checkMaxOrder(order.id);
      for (const orderProduct of order.Order_Products) {
        if (checkOrderProduct.ProductId === orderProduct.ProductId) {
          lastProduct = orderProduct.ProductId;
          listLastProduct.push(lastProduct);
        }
        const order_data = {
          id: order.id,
          status: order.status,
          name: order.name,
          address: order.address,
          phone: order.phone,
          user_id: order.UserId,
          total: order.total,
          product_id: orderProduct.ProductId,
          quantity: orderProduct.quantity,
          product_price: orderProduct.price_product,
          product_name: orderProduct.Product.name,
          color: orderProduct.color,
          option: orderProduct.option,
          product_image: orderProduct.Product.image,
        };
        res_order.push(order_data);
      }
    }
    return res.status(200).json({
      message: "Thông tin đơn hàng đã hủy !",
      order: res_order,
      last_product: listLastProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addOrder,
  getOrderWait,
  getOrderShip,
  getOrderComplete,
  getOrderCancel,
};
