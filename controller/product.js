const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

const Product = require("../model/product");

//params
exports.getProductid = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "no product found",
        });
      }
      req.product = product;
      next();
    });
};
//read
exports.getproduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
//read all
exports.getallproduct = (req, res) => {
  //using parseInt as every thing comes as a string so convert in into integer
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "No product found in the file",
        });
      }
      res.json(product);
    });
};
//create
exports.createproduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.KeepExtensions = true;

  form.parse(req, (err, field, file) => {
    if (err) {
      res.status(400).json({
        error: "problem with image",
      });
    }

    const { name, price } = field;

    if (!name || !price) {
      console.log(name, price);

      return res.status(400).json({
        error: "please enter all the feild",
      });
    }
    let product = new Product(field);

    //handle file here

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "image size is greater than 3 MB",
        });
      }
      //getting the path of the photo
      product.photo.data = fs.readFileSync(file.photo.path);
      //getting the type of the file eg,png,jpg
      product.photo.contentType = file.photo.type;
    }
    console.log(product);
    //save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "failed to store the image",
        });
      }
      res.json(product);
    });
  });
};
//reading image
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
