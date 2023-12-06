import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

function Shop() {
  const { shopId } = useParams();
  const [cars, setCars] = useState([]);
  const [parts, setParts] = useState([]);

  const navigate = useNavigate();
  const { userData, accessToken, login, logout } = useAuth();

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7119/api/shops/${shopId}/cars`
        );
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCarsData();
  }, []);

  useEffect(() => {
    const fetchPartsData = async (carId) => {
      try {
        const response = await fetch(
          `https://localhost:7119/api/shops/${shopId}/cars/${carId}/parts`
        );
        const data = await response.json();

        setParts((prevData) => ({ ...prevData, [carId]: data.length }));
      } catch (error) {
        console.error(`Error fetching parts data for car ${carId}:`, error);
      }
    };

    cars.forEach((car) => {
      fetchPartsData(car.id);
    });
  }, [cars]);

  const deleteShop = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`https://localhost:7119/api/Shops/${shopId}`, config);
      navigate("/Shops");
    } catch (error) {
      console.error(`Error deleting shop ${shopId}:`, error);
    }
  };

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="mt-24 w-full">
          <div className="mt-8 mx-36 justify-start space-y-4">
            <div className="flex justify-between">
              <Link
                to={"/Shops"}
                className="text-redText text-2xl font-semibold"
              >
                Back
              </Link>
              <span className="text-greyHeader text-2xl font-semibold">
                Cars
              </span>
              <div className="space-x-2">
                <Link
                  onClick={() => {}}
                  className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                >
                  Edit Shop
                </Link>
                <Link
                  onClick={deleteShop}
                  className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                >
                  Delete Shop
                </Link>
                <Link
                  className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                  to={`/AddCar/${shopId}`}
                >
                  Add Car
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap">
              {cars.map((carData) => {
                const partsCount = parts[carData.id] || 0;

                return (
                  <Link
                    key={carData.id}
                    to={`/Car/${shopId}/${carData.id}`}
                    className="w-1/3 text-left shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4"
                  >
                    <div className="items-center flex justify-between">
                      <span className="text-lg">
                        {carData.make} {carData.model}
                      </span>
                      <span className="text-redText text-xs">
                        {partsCount} parts
                      </span>
                    </div>
                    <span className="text-sm font-normal text-opacity-80">
                      First Registration:{" "}
                      {carData.firstRegistration.split("T")[0]}
                    </span>
                    <br />
                    <span className="text-sm font-normal text-opacity-80">
                      Engine: {carData.engine}
                    </span>
                    <br />
                    <span className="text-sm font-normal text-opacity-80">
                      Power: {carData.power}
                    </span>
                    <br />
                    <span className="text-sm font-normal text-opacity-80">
                      Mileage: {carData.mileage}
                    </span>
                    <br />
                    <span className="text-sm font-normal text-opacity-80">
                      Body: {carData.body}
                    </span>
                    <br />
                    <span className="text-sm font-normal text-opacity-80">
                      Fuel: {carData.fuel}
                    </span>
                    <br />
                    <span className="text-sm font-normal text-opacity-80">
                      Gearbox: {carData.gearbox}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
