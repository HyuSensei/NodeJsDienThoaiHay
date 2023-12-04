const db = require("../../models/index");

const indexProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { count, rows: products } = await db.Product.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

const getColorProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { count, rows: color_products } =
      await db.Color_Product.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: db.Product,
            attributes: ["name"],
          },
          {
            model: db.Color,
            attributes: ["name"],
          },
        ],
      });
    const totalPage = Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      color_products: color_products,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStorageProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const { count, rows: storage_products } = await db.Price.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: db.Product,
          attributes: ["name"],
        },
        {
          model: db.Storage,
          attributes: ["name"],
        },
      ],
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      total: count,
      total_page: totalPage,
      current_page: page,
      storage_products: storage_products,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeProduct = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      image,
      price,
      screen,
      resolution,
      rear_camera,
      front_camera,
      cpu,
      pin,
      sim,
      category_id,
      color_id,
      storage_id,
    } = req.body;
    if (
      !name ||
      !image ||
      !price ||
      !screen ||
      !resolution ||
      !rear_camera ||
      !front_camera ||
      !cpu ||
      !pin ||
      !sim ||
      !category_id ||
      !color_id ||
      !storage_id
    ) {
      return res
        .status(400)
        .json({ detail: "Vui lòng điền đầy đủ thông tin sản phẩm !" });
    }
    let product = await db.Product.create({
      name: name,
      image: "/images/products/" + image,
      screen: screen,
      resolution: resolution,
      rear_camera: rear_camera,
      front_camera: front_camera,
      cpu: cpu,
      pin: pin,
      sim: sim,
      price_base: price,
      CategoryId: category_id,
    });
    let color_product = await db.Color_Product.create({
      ColorId: color_id,
      ProductId: product.id,
    });
    let price_product = await db.Price.create({
      StorageId: storage_id,
      ProductId: product.id,
      price_product: price,
    });
    return res.status(200).json({
      success: true,
      message: "Thêm sản phẩm thành công !",
      product: product,
      color_product: color_product,
      price_product: price_product,
    });
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req, res) => {
  try {
    let product_id = req.params.product_id;
    let data_product = await db.Product.findOne({
      where: { id: product_id },
    });
    if (!data_product) {
      return res.status(404).json({
        detail: "Không tồn tại sản phẩm !",
      });
    }
    let categories = await db.Category.findAll();
    return res.status(200).json({
      success: true,
      product: data_product,
      categories: categories,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    let product_id = req.params.product_id;
    let {
      name,
      image,
      price,
      screen,
      resolution,
      rear_camera,
      front_camera,
      cpu,
      pin,
      sim,
      category_id,
    } = req.body;
    if (
      !name ||
      !price ||
      !screen ||
      !resolution ||
      !rear_camera ||
      !front_camera ||
      !cpu ||
      !pin ||
      !sim
    ) {
      return res
        .status(400)
        .json({ detail: "Vui lòng điền đầy đủ thông tin sản phẩm !" });
    }
    let product = await db.Product.findOne({
      where: { id: product_id },
    });
    if (!product) {
      return res.status(404).json({ detail: "Không tồn tại sản phẩm !" });
    }
    if (!image) {
      image = product.image;
    } else {
      image = "/images/products/" + image;
    }
    await db.Product.update(
      {
        name: name,
        image: image,
        screen: screen,
        resolution: resolution,
        rear_camera: rear_camera,
        front_camera: front_camera,
        cpu: cpu,
        pin: pin,
        sim: sim,
        price_base: price,
        CategoryId: category_id,
      },
      {
        where: {
          id: product_id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Sửa sản phẩm thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAddProduct = async (req, res) => {
  try {
    let categories = await db.Category.findAll();
    let colors = await db.Color.findAll();
    let storages = await db.Storage.findAll();
    return res.status(200).json({
      success: true,
      categories: categories,
      colors: colors,
      storages: storages,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAddColorProduct = async (req, res) => {
  try {
    let products = await db.Product.findAll();
    let colors = await db.Color.findAll();
    return res.status(200).json({
      success: true,
      products: products,
      colors: colors,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAddStorageProduct = async (req, res) => {
  try {
    let products = await db.Product.findAll();
    let storages = await db.Storage.findAll();
    return res.status(200).json({
      success: true,
      products: products,
      storages: storages,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const product = await db.Product.findOne({
      where: {
        id: product_id,
      },
    });
    if (!product) {
      return res.status(404).json({
        detail: "Không tồn tại sản phẩm !",
      });
    }
    const order_product = await db.Order_Product.findOne({
      where: {
        ProductId: product_id,
      },
    });
    if (order_product) {
      return res.status(409).json({
        detail: `Sản phẩm hiện đang tồn tại trong đơn hàng ID:${order_product.OrderId}`,
      });
    }
    await db.Product.destroy({
      where: {
        id: product_id,
      },
    });
    await db.Color_Product.destroy({
      where: {
        ProductId: product_id,
      },
    });
    await db.Price.destroy({
      where: {
        ProductId: product_id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công !",
    });
  } catch (error) {
    console.log(error);
  }
};

const storeColorProduct = async (req, res) => {
  try {
    const { product_id, color_id } = req.body;
    console.log(req.body);
    if (!product_id || !color_id) {
      return res.status(400).json({
        detail: "Vui lòng chọn đầy đủ thông tin !",
      });
    }
    let color_product = await db.Color_Product.findOne({
      where: {
        ProductId: product_id,
        ColorId: color_id,
      },
    });
    if (color_product) {
      return res.status(400).json({
        detail: "Màu của sản phẩm đã tồn tại !",
      });
    }
    let store_color_product = await db.Color_Product.create({
      ProductId: product_id,
      ColorId: color_id,
    });
    return res.status(200).json({
      success: true,
      message: "Thêm màu cho sản phẩm thành công !",
      color_product: store_color_product,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeStorageProduct = async (req, res) => {
  try {
    const { storage_id, product_id, price_product } = req.body;
    console.log(req.body);
    if (!product_id || !storage_id || !price_product) {
      return res.status(400).json({
        detail: "Vui lòng chọn đầy đủ thông tin !",
      });
    }
    let storage_product = await db.Price.findOne({
      where: {
        ProductId: product_id,
        StorageId: storage_id,
      },
    });
    if (storage_product) {
      return res.status(400).json({
        detail: "Bô nhớ sản phẩm đã tồn tại !",
      });
    }
    let store_color_product = await db.Price.create({
      ProductId: product_id,
      StorageId: storage_id,
      price_product: price_product,
    });
    return res.status(200).json({
      success: true,
      message: "Thêm bộ nhớ cho sản phẩm thành công !",
      store_color_product: store_color_product,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  indexProduct,
  editProduct,
  storeProduct,
  updateProduct,
  deleteProduct,
  getAddProduct,
  getColorProduct,
  getStorageProduct,
  getAddColorProduct,
  getAddStorageProduct,
  storeColorProduct,
  storeStorageProduct,
};
