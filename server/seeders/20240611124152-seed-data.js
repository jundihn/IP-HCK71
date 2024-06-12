"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const response = await axios({
      method: "GET",
      url: "https://car-data.p.rapidapi.com/cars",
      params: {
        limit: "10",
        page: "0",
      },
      headers: {
        "x-rapidapi-key": "784f6b5b4cmsh81e84810646a336p1fa878jsn4a6cb3c457d7",
        "x-rapidapi-host": "car-data.p.rapidapi.com",
      },
    });
    // const response = await axios.get("https://car-data.p.rapidapi.com/cars");

    const data = response.data.map((cars) => {
      delete cars.id;
      cars.createdAt = cars.updatedAt = new Date();
      let obj = {...cars, name: cars.make};
      delete obj.make
      return obj
    });
    // console.log(data);

    await queryInterface.bulkInsert("Cars", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Cars", null);
  },
};
