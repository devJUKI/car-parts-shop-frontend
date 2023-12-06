import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import carInfo from "../assets/carInfo.json";
import fuelTypes from "../assets/fuelTypes.json";
import bodyTypes from "../assets/bodyTypes.json";
import gearboxTypes from "../assets/gearboxTypes.json";

function AddCar() {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [bodies, setBodies] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [gearboxes, setGearboxes] = useState([]);
  const { userData, accessToken, login, logout } = useAuth();

  const [selectedMake, setSelectedMake] = useState(-1);
  const [selectedModel, setSelectedModel] = useState(-1);
  const [firstRegistration, setFirstRegistration] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [mileage, setMileage] = useState("");
  const [engine, setEngine] = useState("");
  const [power, setPower] = useState("");
  const [bodyTypeId, setBodyTypeId] = useState(-1);
  const [fuelTypeId, setFuelTypeId] = useState(-1);
  const [gearboxTypeId, setGearboxTypeId] = useState(-1);

  useEffect(() => {
    fetchData("https://localhost:7119/api/cardata/makes", setMakes);
    fetchData("https://localhost:7119/api/cardata/fuels", setFuels);
    fetchData("https://localhost:7119/api/cardata/bodies", setBodies);
    fetchData("https://localhost:7119/api/cardata/gearboxes", setGearboxes);
  }, []);

  useEffect(() => {
    const modelsEndpoint = `https://localhost:7119/api/cardata/models?makeId=${selectedMake}`;
    fetchData(modelsEndpoint, setModels);
  }, [selectedMake]);

  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePost = async () => {
    if (
      selectedMake == -1 ||
      selectedModel == -1 ||
      mileage == "" ||
      engine == "" ||
      power == "" ||
      bodyTypeId == -1 ||
      fuelTypeId == -1 ||
      gearboxTypeId == -1
    ) {
      alert("Please, provide appropriate inputs");
      return;
    }

    try {
      const postData = {
        firstRegistration: firstRegistration,
        mileage: mileage,
        engine: engine,
        power: power,
        bodyTypeId: bodyTypeId,
        fuelTypeId: fuelTypeId,
        gearboxTypeId: gearboxTypeId,
        modelId: selectedModel,
        shopId: shopId,
      };

      console.log(postData);

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `https://localhost:7119/api/shops/${shopId}/cars`,
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
                Add Car
              </span>
              <span className="text-redText text-opacity-0 text-2xl font-semibold">
                Back
              </span>
            </div>
            <div className="space-y-4">
              <select
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                value={selectedMake}
                onChange={(e) => {
                  setSelectedMake(e.target.value);
                }}
              >
                <option value={-1}>Choose make</option>
                {makes.map((make) => (
                  <option key={make.id} value={make.id}>
                    {make.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                }}
              >
                <option value={-1}>Choose model</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={firstRegistration}
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onChange={(e) => {
                  setFirstRegistration(e.target.value);
                }}
              />
              <input
                type="text"
                defaultValue="Enter mileage"
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onFocus={(e) => {
                  if (e.target.value === "Enter mileage") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "Enter mileage";
                  }
                }}
                onChange={(e) => {
                  setMileage(e.target.value);
                }}
              />
              <input
                type="text"
                defaultValue="Enter engine"
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onFocus={(e) => {
                  if (e.target.value === "Enter engine") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "Enter engine";
                  }
                }}
                onChange={(e) => {
                  setEngine(e.target.value);
                }}
              />
              <input
                type="text"
                defaultValue="Enter power"
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onFocus={(e) => {
                  if (e.target.value === "Enter power") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "Enter power";
                  }
                }}
                onChange={(e) => {
                  setPower(e.target.value);
                }}
              />
              <select
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onChange={(e) => {
                  setBodyTypeId(e.target.value);
                }}
              >
                <option value={-1}>Choose body</option>
                {bodies.map((body) => (
                  <option key={body.id} value={body.id}>
                    {body.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onChange={(e) => {
                  setFuelTypeId(e.target.value);
                }}
              >
                <option value={-1}>Choose fuel</option>
                {fuels.map((fuel) => (
                  <option key={fuel.id} value={fuel.id}>
                    {fuel.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                onChange={(e) => {
                  setGearboxTypeId(e.target.value);
                }}
              >
                <option value={-1}>Choose gearbox</option>
                {gearboxes.map((gearbox) => (
                  <option key={gearbox.id} value={gearbox.id}>
                    {gearbox.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handlePost}
                className="border text-sm py-2 rounded-lg text-white bg-redText font-semibold flex w-full justify-center"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCar;
