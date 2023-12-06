import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

function AddPart() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { userData, accessToken, login, logout } = useAuth();

  const { shopId, carId } = useParams();
  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      const postData = {
        Name: name,
        Price: price,
        CarId: carId,
        ShopId: shopId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `https://localhost:7119/api/shops/${shopId}/Cars/${carId}/Parts`,
        postData,
        config
      );

      navigate(`/Car/${shopId}/${carId}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="mt-24 w-full">
          <div className="mt-8 mx-36 justify-start space-y-4">
            <div className="justify-between flex">
              <Link
                to={`/Car/${shopId}/${carId}`}
                className="text-redText text-2xl font-semibold"
              >
                Back
              </Link>
              <span className="text-greyHeader text-2xl font-semibold">
                Create Part
              </span>
              <span className="text-redText text-opacity-0 text-2xl font-semibold">
                Back
              </span>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                defaultValue="Enter part name"
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onFocus={(e) => {
                  if (e.target.value === "Enter part name") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "Enter part name";
                  }
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                defaultValue="Enter price"
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onFocus={(e) => {
                  if (e.target.value === "Enter price") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "Enter price";
                  }
                }}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <button
                onClick={handlePost}
                className="border text-sm py-2 rounded-lg text-white bg-redText font-semibold flex w-full justify-center"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPart;
