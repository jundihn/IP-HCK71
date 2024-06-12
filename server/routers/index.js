const express = require("express");
const Controller = require("../controllers/Controller");
const router = express.Router();

const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.get("/cars", Controller.getCar);
router.put("/edit_profile", authentication, Controller.putUserProfile);
router.delete("/delete_account", authentication, Controller.deleteAccount);
router.post("/wishList/:id", authentication, Controller.postMyCar);

module.exports = router;
