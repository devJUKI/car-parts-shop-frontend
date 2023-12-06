import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

function EditShop() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const { userData, accessToken, login, logout } = useAuth();

  const navigate = useNavigate();
  const { shopId } = useParams();

  const handlePut = async () => {
    try {
      const postData = {
        Id: shopId,
        Name: name,
        Location: location,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `https://localhost:7119/api/Shops/${shopId}`,
        postData,
        config
      );

      navigate(`/Shop/${shopId}`);
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
                to={`/Shop/${shopId}`}
                className="text-redText text-2xl font-semibold"
              >
                Back
              </Link>
              <span className="text-greyHeader text-2xl font-semibold">
                Edit Shop
              </span>
              <span className="text-redText text-opacity-0 text-2xl font-semibold">
                Back
              </span>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                defaultValue="Enter shop name"
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onFocus={(e) => {
                  if (e.target.value === "Enter shop name") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "Enter shop name";
                  }
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                defaultValue="Enter shop location"
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onFocus={(e) => {
                  if (e.target.value === "Enter shop location") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "Enter shop location";
                  }
                }}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <button
                onClick={handlePut}
                className="border text-sm py-2 rounded-lg text-white bg-redText font-semibold flex w-full justify-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditShop;
