import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import axios from "axios";

function Part() {
  const { shopId, carId, partId } = useParams();
  const [part, setPart] = useState();

  const { userData, accessToken, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7119/api/shops/${shopId}/cars/${carId}/parts/${partId}`
        );
        const data = await response.json();
        setPart(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPartData();
  }, []);

  const deletePart = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(
        `https://localhost:7119/api/shops/${shopId}/Cars/${carId}/Parts/${partId}`,
        config
      );

      navigate(`/Car/${shopId}/${carId}`);
    } catch (error) {
      console.error(`Error deleting car ${carId}:`, error);
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
              {part && (
                <span className="text-greyHeader text-2xl font-semibold">
                  {part.name} - {part.price} eur.
                </span>
              )}
              <div className="space-x-2">
                <Link
                  className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                  to={`/EditPart/${shopId}/${carId}/${partId}`}
                >
                  Edit Part
                </Link>
                <Link
                  className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                  onClick={deletePart}
                >
                  Delete Part
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Part;
