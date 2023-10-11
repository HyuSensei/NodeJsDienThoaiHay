const db = require("../models/index");

const storeProduct = async (req, res) => {
  try {
    if (
      req.body.name == "" ||
      req.body.image == "" ||
      req.body.price == "" ||
      req.body.description == "" ||
      req.body.sim == "" ||
      req.body.screen == "" ||
      req.body.cpu == "" ||
      req.body.rear_camera == "" ||
      req.body.front_camera == "" ||
      req.body.speaker == "" ||
      req.body.pin == "" ||
      req.body.RamId == "" ||
      req.body.StorageId == "" ||
      req.body.CategoryId == "" ||
      req.body.ColorId == ""
    ) {
      return res.json({
        success: false,
        message: "Vui lòng thêm đầy đủ thông tin sản phẩm",
      });
    } else {
      let name = req.body.name;
      let price = req.body.price;
      let image = req.body.image;
      let description = req.body.description;
      let sim = req.body.sim;
      let screen = req.body.screen;
      let cpu = req.body.cpu;
      let rear_camera = req.body.rear_camera;
      let front_camera = req.body.front_camera;
      let speaker = req.body.speaker;
      let pin = req.body.pin;
      let RamId = req.body.RamId;
      let StorageId = req.body.StorageId;
      let CategoryId = req.body.CategoryId;
      let ColorId = req.body.ColorId;
      let product = await db.Product.create({
        name: name,
        image: image,
        price: price,
        description: description,
        sim: sim,
        screen: screen,
        cpu: cpu,
        rear_camera: rear_camera,
        front_camera: front_camera,
        speaker: speaker,
        pin: pin,
        CategoryId: CategoryId,
      });
      if (product) {
        let color_product = await db.Color_Product.create({
          ColorId: ColorId,
          ProductId: product.id,
        });
        let price_add = await db.Price.create({
          RamId: RamId,
          StorageId: StorageId,
          ProductId: product.id,
          price: price,
        });
        return res.json({
          success: true,
          message: "Thêm sản phẩm thành công",
          product: product,
          color_product,
          price: price_add,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const indexProduct = async (req, res) => {
  try {
    const page = req.params.page;
    if (page <= 0) {
      return res.json({
        success: false,
        message: `Không tìm thấy sản phẩm`,
      });
    }
    const product_page = 2;

    let { count, rows } = await db.Product.findAndCountAll({
      offset: (page - 1) * product_page,
      limit: product_page,
      include: [
        {
          model: db.Price,
          attributes: ["price"],
        },
      ],
    });
    const totalPages = Math.ceil(count / product_page);
    if (page == "" || page > totalPages) {
      return res.json({
        success: false,
        message: `Không tìm thấy sản phẩm`,
      });
    }
    return res.json({
      success: true,
      product: rows,
      countPage: totalPages,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    let sim = req.body.sim;
    let screen = req.body.screen;
    let cpu = req.body.cpu;
    let rear_camera = req.body.rear_camera;
    let front_camera = req.body.front_camera;
    let speaker = req.body.speaker;
    let pin = req.body.pin;
    let RamId = req.body.RamId;
    let StorageId = req.body.StorageId;
    let CategoryId = req.body.CategoryId;
    let ColorId = req.body.ColorId;
    let ColorProductId = req.body.ColorProductId;
    let PriceId = req.body.PriceId;
    let getproduct = await db.Product.findOne({ where: { id: id } });
    if (!getproduct) {
      return res.json({
        success: false,
        message: "Không tìm thấy sản phẩm cần sửa !",
      });
    } else {
      await db.Product.update(
        {
          name: name,
          image: image,
          price: price,
          description: description,
          sim: sim,
          screen: screen,
          cpu: cpu,
          rear_camera: rear_camera,
          front_camera: front_camera,
          speaker: speaker,
          pin: pin,
          CategoryId: CategoryId,
        },
        { where: { id: id } }
      );
      await db.Price.update(
        {
          RamId: RamId,
          StorageId: StorageId,
        },
        { where: { id: PriceId, ProductId: id } }
      );
      await db.Color_Product.update(
        {
          ColorId: ColorId,
        },
        { where: { id: ColorProductId, ProductId: id } }
      );
      return res.json({
        success: true,
        message: "Sửa sản phẩm thành công !",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let getproduct = await db.Product.findOne({ where: { id: id } });
    let ColorProductId = req.body.ColorProductId;
    let PriceId = req.body.PriceId;
    if (!getproduct) {
      return res.json({
        success: false,
        message: "Không tìm thấy sản phẩm cần xóa !",
      });
    } else {
      await db.Color_Product.destroy({
        where: {
          id: ColorProductId,
          ProductId: id,
        },
      });
      await db.Price.destroy({
        where: {
          id: PriceId,
          ProductId: id,
        },
      });
      await db.Product.destroy({
        where: {
          id: id,
        },
      });
      return res.json({
        success: true,
        message: "Xóa sản phẩm thành công!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const showProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await db.Product.findOne({
      where: { id: id },
    });
    let color = await db.Color_Product.findAll({
      attributes: ["ColorId", "ProductId"],
      include: [
        {
          model: db.Color,
          attributes: ["name"],
          require: true,
        },
      ],
      where: { ProductId: id },
    });
    let price = await db.Price.findAll({
      attributes: ["id", "price"],
      include: [
        {
          model: db.Ram,
          attributes: ["name"],
          required: true,
        },
        {
          model: db.Storage,
          attributes: ["name"],
          required: true,
        },
      ],
      where: { ProductId: id },
    });
    if (!product) {
      return res.json({
        success: false,
        message: `Không có sản phẩm id= ${id}!`,
      });
    }
    return res.json({
      success: true,
      message: "Chi tiết sản phẩm",
      product: product,
      price_product: price,
      color_product: color,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  storeProduct,
  updateProduct,
  deleteProduct,
  showProduct,
  indexProduct,
};
