const User = require("../model/user");
exports.getUserById = (req, res, next, id) => {
  //middle ware finding the user by id
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "no user FOUND",
      });
    }
    //saving the user into profile which will created in the front end

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  //to check the the above middleware that it is returning the right value or not
  return res.json(req.profile);
};
