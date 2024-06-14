// import Card from "./Card";
// import DropDown from "./DropDownUser";
import CustomNavbar from "./CustomNavbar";
import Navbar from "./Navbar";

import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const getCar = async () => {
    try {
      let { data } = await axios({
        method: "GET",
        url: "/cars",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(data.cars);
      setCars(data.cars);
      // console.log(cars);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  const add = async (id) => {
    try {
      let { data } = await axios({
        method: "POST",
        url: `/wishList/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      let carId = data.result.Car;
      setCars(carId);
      // console.log(data.result.Car);
      navigate("/wishList");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(cars);
  return (
    <>
      <CustomNavbar />
      {/* <Navbar /> */}
      <div className="pt-20 px-4">
        {/* <h2 className="text-2xl font-semibold mb-4 mt-4">Rekomendasi</h2>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2 mb-4">
            <button className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">
              Harga Terendah
            </button>
            <button className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2">
              Mobil Terbaru
            </button>
            <button className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2">
              Tahun Terbaru
            </button>
          </div>
          <a
            href="#"
            className="text-red-600 hover:text-red-700 font-semibold block text-right mt-2"
          >
            Lihat Semua
          </a>
        </div> */}
        <div className="grid gap-4 md:grid-cols-4">
          {cars.map((cars) => {
            return (
              <div
                key={cars.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  style={{ height: "280px", width: "100%", objectFit: "cover" }}
                  className="w-full"
                  src="https://asset-2.tstatic.net/belitung/foto/bank/images/Toyota-melakukan-pembenahan-pada-sisi-eksterior-Calya-dengan-tema-tampilan-lebih-sporty-dan-modern.jpg"
                  alt="Toyota Calya 1.2 G 2022"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{cars.name}</h3>
                  <div style={{ height: "60px" }}>
                    <p className="text-sm text-gray-500">
                      {cars.type} - {cars.year}
                    </p>
                    <p className="text-sm text-gray-500">Kota Tangerang</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <p className="font-bold text-red-600">
                      {new Intl.NumberFormat("ID-id", {
                        style: "currency",
                        currency: "IDR",
                      }).format(cars.price)}
                    </p>
                    <button
                      onClick={() => add(cars.id)}
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 ml-auto"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
