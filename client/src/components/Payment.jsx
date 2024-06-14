import axios from "axios";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Payment() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const trxId = params.get("trxId");

  const bismillahLunas = async () => {
    const data = await axios.post(
      "http://localhost:3000/payment",
      {
        trxId: trxId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
        },
      }
    );
    if (response.status === 200) {
      setMessage("Payment successful!");
    } else {
      setMessage("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Transaction ID: {trxId}</p>

      <button
        onClick={() => bismillahLunas()}
        style={{
          border: "black",
          borderRadius: 99,
          backgroundColor: "red",
          padding: "10px",
          cursor: "pointer !important",
        }}
      >
        Klik Disini Langsung Lunas
      </button>
    </div>
  );
}
