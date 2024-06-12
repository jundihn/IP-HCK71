const { User, Car, WishList, Transaction } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt_token");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }
      if (!password) {
        res.status(400).json({ message: "Password is required" });
        return;
      }

      let user = await User.create({ username, email, password });
      res
        .status(201)
        .json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }
      if (!password) {
        res.status(400).json({ message: "Password is required" });
        return;
      }

      let user = await User.findOne({ where: { email } });
      res;

      if (!user || !comparePassword(password, user.password)) {
        res.status(401).json({ message: "Invalid email/password" });
      }
      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getCar(req, res, next) {
    try {
      let cars = await Car.findAll();
      res.status(200).json({ message: "List Car", cars });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async postMyCar(req, res, next) {
    try {
      let myCarId = req.params.id;
      let userId = req.user.id;

      let car = await Car.findByPk(myCarId);

      if (!car) {
        res.status(404).json({ message: "Not Found" });
      }

      let wishList = await WishList.create({
        userId: userId,
        carId: myCarId,
      });

      let result = await WishList.findOne({
        where: { id: wishList.id },
        include: {
          model: Car,
          //   attributes: [name, model, year, type],
        },
      });

      res.status(201).json({ message: "Car added to wishlist", result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async putUserProfile(req, res, next) {
    try {
      let { username, email, password } = req.body;
      //   console.log(req.body);

      let user = req.user;
      let updates = {};

      if (username) updates.username = username;
      if (email) updates.email = email;
      if (password) updates.password = password;

      await User.update(updates, {
        where: { id: user.id },
      });

      //   console.log(updates, "iniii");
      const updatedUser = await User.findByPk(user.id);

      res.status(200).json({ message: "User updated", updatedUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteAccount(req, res, next) {
    try {
      let userId = req.user.id;

      let user = await User.findByPk(userId);

      if (!user) {
        res.status(404).json({ message: "Not Found" });
      }

      await Transaction.destroy({ where: { userId } });
      await WishList.destroy({ where: { userId } });
      await user.destroy();

      res.status(200).json({ message: "youre gone" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
