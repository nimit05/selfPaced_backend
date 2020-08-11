const { Router } = require("express");
const route = Router();
const { auth } = require("../../middleware/auth");
const { Users, Products, Library, Review, Transaction } = require("../../data/db");
const { getAllProducts, addreport } = require("../../controllers/products");
const { AddToCart, AddToLibrary, CartProducts } = require("../../controllers/userLibrary");
const { createTransaction } = require("../../controllers/user");
const Sequelize = require("sequelize");

route.post("/Buy", auth, async (req, res) => {
  const product = await Products.findOne({
    where: { refrenceId: req.body.refrenceId }
  });
  product.ownBy++;
  product.save();
  const lib_item = await Library.findOne({
    where: {
      [Sequelize.Op.and]: [{ userId: req.user.username }, { ProductId: product.id }]
    }
  });
  if (!lib_item) {
    const item = await AddToLibrary(req.user.username, product.id).catch(err => {
      console.log(err);
      res.send({ error: "internal error" + err });
    });
  }
});

route.post("/AddToCart", auth, async (req, res) => {
  const cart = await AddToCart(req.user.username, req.body.refrenceId);
  res.send(cart);
});

route.post("/RemoveFromCart", auth, async (req, res) => {
  const cart = await CartProducts(req.user.username);
  cart.splice(cart.indexOf(req.body.refrenceId), 1);
  req.user.Cart = cart.join(";");
  req.user.save();
  res.send(req.user.Cart);
});

route.get("/myproducts", auth, async (req, res) => {
  let pro_ref = await Library.findAll({
    where: { userId: req.user.username },
    include: { model: Products, as: "Product" }
  }).catch(err => {
    console.log(err);
    res.send({ error: "internal error" });
  });

  console.log(pro_ref);

  res.send(pro_ref);
});
route.get("/cat/:category/:limit/:offset", async (req, res) => {
  try {
    let Limit = 10;
    let Offset = 0;

    if (req.params.limit) {
      Limit = parseInt(req.params.limit);
    }
    if (req.params.offset) {
      Offset = parseInt(req.params.offset);
    }

    const products = await Products.findAll({
      attributes: [
        "refrenceId",
        "category",
        "title",
        "s_title",
        "short_des",
        "Description",
        "tag",
        "Value",
        "cover_img",
        "createdAt",
        "rating",
        "branch"
      ],
      order: [["createdAt", "DESC"]],
      limit: Limit,
      offset: Offset,
      where: { [Sequelize.Op.and]: [{ deleted: false }, { branch: req.params.category }] }
    });

    res.send({ products });
  } catch (err) {
    console.log(err);

    res.status(500).send({ error: "internal Error" });
  }
});
route.get("/mostB/:limit/:offset", async (req, res) => {
  try {
    let Limit = 10;
    let Offset = 0;

    if (req.params.limit) {
      Limit = parseInt(req.params.limit);
    }
    if (req.params.offset) {
      Offset = parseInt(req.params.offset);
    }
    const products = await Products.findAll({
      attributes: [
        "refrenceId",
        "category",
        "title",
        "s_title",
        "short_des",
        "Description",
        "tag",
        "Value",
        "cover_img",
        "createdAt",
        "rating"
      ],
      order: [["ownBy", "DESC"]],
      limit: Limit,
      offset: Offset,
      where: { deleted: false }
    });

    res.send({ products });
  } catch (err) {
    console.log(err);

    res.status(500).send({ error: "internal Error" });
  }
});
route.get("/rated/:limit/:offset", async (req, res) => {
  try {
    let Limit = 10;
    let Offset = 0;

    if (req.params.limit) {
      Limit = parseInt(req.params.limit);
    }
    if (req.params.offset) {
      Offset = parseInt(req.params.offset);
    }
    const products = await Products.findAll({
      attributes: [
        "refrenceId",
        "category",
        "title",
        "s_title",
        "short_des",
        "Description",
        "tag",
        "Value",
        "cover_img",
        "createdAt",
        "rating"
      ],
      order: [["rating", "DESC"]],
      limit: Limit,
      offset: Offset,
      where: { deleted: false }
    });

    res.send({ products });
  } catch (err) {
    console.log(err);

    res.status(500).send({ error: "internal Error" });
  }
});

route.get("/latest/:limit/:offset", async (req, res) => {
  try {
    let Limit = 10;
    let Offset = 0;

    if (req.params.limit) {
      Limit = parseInt(req.params.limit);
    }
    if (req.params.offset) {
      Offset = parseInt(req.params.offset);
    }
    const products = await Products.findAll({
      attributes: [
        "refrenceId",
        "category",
        "title",
        "s_title",
        "short_des",
        "Description",
        "tag",
        "Value",
        "cover_img",
        "createdAt",
        "rating"
      ],
      order: [["createdAt", "DESC"]],
      limit: Limit,
      offset: Offset,
      where: { deleted: false }
    });

    res.send({ products });
  } catch (err) {
    console.log(err);

    res.status(500).send({ error: "internal Error" });
  }
});
route.get("/Name", async (req, res) => {
  const products = await Products.findAll({
    attributes: ["refrenceId", "title"]
  });

  res.send({ products });
});

route.get("/specific/:refrenceId", async (req, res) => {
  const product = await Products.findOne({
    where: { refrenceId: req.params.refrenceId },
    attributes: [
      "id",
      "refrenceId",
      "category",
      "title",
      "s_title",
      "short_des",
      "rating",
      "Description",
      "tag",
      "Value",
      "cover_img",
      "sample_pro",
      "SellerUsername"
    ]
  });
  res.send(product);
});
route.delete("/:productId", auth, async (req, res) => {
  try {
    const product = await Library.destroy({
      where: {
        [Sequelize.Op.and]: [{ ProductId: req.params.productId }, { userId: req.user.username }]
      }
    });

    res.send(true);
  } catch (err) {
    console.error(err);
    res.send({ error: "Internal Error" });
  }
});

route.get("/search_item/:refId", auth, async (req, res) => {
  console.log(req.params);
  console.log(req.user);
  const product = await Library.findAll({
    where: {
      userId: req.user.username
    },
    include: { model: Products, as: "Product" }
  }).catch(err => {
    console.log(err);
    res.send({ error: "internal error" });
  });

  if (product) {
    let a = true;
    product.map(e => {
      if (e.Product.refrenceId === req.params.refId) {
        a = false;
        res.send(true);
      }
    });
    if (a) {
      res.send(false);
    }
  } else {
    res.send({ error: "not found" });
  }
  console.log("hello");
});

route.get("/search/:name", async (req, res) => {
  var arr = [];
  console.log("aagya");

  let s = "%" + req.params.name + "%";
  const products = await Products.findAll({
    attributes: [
      "refrenceId",
      "category",
      "title",
      "s_title",
      "short_des",
      "Description",
      "tag",
      "cover_img",
      "rating",
      "keywords"
    ],
    where: {
      keywords: { [Sequelize.Op.like]: s }
    }
  });
  console.log("serach resut", products);

  res.send(products);
});

route.get("/Sold_products/:username", auth, async (req, res) => {
  const products = await Products.findAll({
    where: { SellerUsername: req.params.username }
  });
  res.send(products);
});

route.get("/Ordered_products/:username", auth, async (req, res) => {
  const product = await Transaction.findAll({
    where: {
      [Sequelize.Op.and]: [{ Debited: true }, { userId: req.params.username }]
    },
    include: { model: Products, as: "item" }
  });
  res.send(product);
});

route.post("/report", auth, async (req, res) => {
  const report = await addreport(req.user.username, req.body.refId);
  console.log(report + req.body.refId);
  res.send(report);
});

route.get("/reports/:refId", auth, async (req, res) => {
  const product = await Products.findOne({
    where: { refrenceId: req.params.refId }
  });
  let arr = product.reports.split(";");
  console.log(arr);
  res.send(arr);
});

route.post("/:refId", auth, async (req, res) => {
  const product = await Products.findOne({
    where: { refrenceId: req.params.refId }
  });
  product.deleted = true;
  product.save();
  res.send(true);
});

route.get("/earningInfo", auth, async (req, res) => {
  let my_pro = await Products.findAll({
    where: {
      SellerUsername: req.user.username
    }
  });

  my_pro = my_pro.sort(function (a, b) {
    return a.createdAt - b.createdAt;
  });

  var arr = [];

  for (let i = 0; i < my_pro.length; i++) {
    let trans = await Transaction.findAll({
      where: { itemId: my_pro[i].id }
    });

    arr.push(trans.length);
  }
  console.log(arr);

  res.send(arr);
});

module.exports = { route };
