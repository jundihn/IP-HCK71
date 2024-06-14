const express = require("express");
const Controller = require("../controllers/Controller");
const router = express.Router();

const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/login-google", Controller.loginByGoogle);

router.get("/user", authentication, Controller.getUser);
router.get("/cars", authentication, Controller.getCar);
router.put("/edit_profile", authentication, Controller.putUserProfile);
router.delete("/delete_account", authentication, Controller.deleteAccount);
router.get("/wishList", authentication, Controller.getWishList);
router.post("/transaction", authentication, Controller.transaction);
router.post("/payment", authentication, Controller.lunasinAja);
router.post("/wishList/:id", authentication, Controller.postMyCar);
// router.delete("/wishList/:id", authentication, Controller.deleteWishList);

module.exports = router;
