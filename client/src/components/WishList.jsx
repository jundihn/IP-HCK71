import { useState, useEffect } from "react";
import axios from "../utils/axios";
import CustomNavbar from "./CustomNavbar";
import { useNavigate } from "react-router-dom";

export default function WishList() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const getWishList = async () => {
    try {
      let { data } = await axios({
        method: "GET",
        url: "/wishList",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(data.wishlist);
      let wishList = data.wishlist;
      setCars(wishList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  const deleteWishList = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `/wishList/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setCars(cars.filter((car) => car.carId !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const buyCar = async (data) => {
    try {
      const response = await axios.post(
        "/transaction",
        {
          carId: data.id,
          total: data.price,
          status: "Waiting for Payment",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              localStorage.getItem("access_token") || ""
            }`,
          },
        }
      );

      if (response.data.statusCode === 201) {
        window.open(response.data.xenditURL, "_blank");
        navigate(`/Homepage?trxId=${response.data.transaction_id}`);
      } else {
        alert("GABISA DUL");
      }
      // if(response)
    } catch (error) {
      console.error("Error while buying car:", error);
    }
  };
  return (
    <>
      <CustomNavbar />
      <div className="pt-20 px-4">
        <div className="grid gap-4 md:grid-cols-4">
          {cars.map((cars) => {
            // console.log(cars);
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
                  <p className="text-sm text-gray-500">
                    {cars.model} - {cars.year}
                  </p>
                  <p className="text-sm text-gray-500">Kota Tangerang</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <p className="font-bold text-red-600">
                      {new Intl.NumberFormat("ID-id", {
                        style: "currency",
                        currency: "IDR",
                      }).format(cars.price)}
                    </p>
                    <button
                      onClick={() => buyCar(cars)}
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 ml-auto"
                    >
                      Buy
                    </button>
                    {/* <button
                      onClick={() => deleteWishList(cars.id)}
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 ml-auto"
                    >
                      Delete
                    </button> */}
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
