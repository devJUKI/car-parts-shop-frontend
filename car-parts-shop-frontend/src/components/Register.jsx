import { useState } from "react";
import Background from "../assets/background.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { accessToken, login, logout } = useAuth();

  const [firstname, setFirstname] = useState("Firstname");
  const [lastname, setLastname] = useState("Lastname");
  const [phoneNumber, setPhoneNumber] = useState("Phone number");
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Password");
  const [repeatPassword, setRepeatPassword] = useState("Repeat password");
  const [showSecondStep, setShowSecondStep] = useState(false);

  const firstStep = () => {
    return (
      <>
        <div className="space-y-3">
          <input
            type="text"
            value={email}
            className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "Email") {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = "Email";
              }
            }}
          />
          <input
            type="text"
            value={password}
            className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "Password") {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = "Password";
              }
            }}
          />
          <input
            type="text"
            value={repeatPassword}
            className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
            onChange={(e) => setRepeatPassword(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "Repeat password") {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = "Repeat password";
              }
            }}
          />
          <button
            onClick={handleFirstStep}
            className="border w-full text-sm py-2 rounded-lg text-white bg-redText font-semibold"
          >
            Continue
          </button>
        </div>
      </>
    );
  };

  const secondStep = () => {
    return (
      <>
        <div className="space-y-3">
          <input
            type="text"
            value={firstname}
            className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
            onChange={(e) => setFirstname(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "Firstname") {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = "Firstname";
              }
            }}
          />
          <input
            type="text"
            value={lastname}
            className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
            onChange={(e) => setLastname(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "Lastname") {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = "Lastname";
              }
            }}
          />
          <input
            type="text"
            value={phoneNumber}
            className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
            onChange={(e) => setPhoneNumber(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "Phone number") {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = "Phone number";
              }
            }}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleBack}
              className="w-1/3 border-2 border-redText text-sm py-2 rounded-lg text-redText bg-white font-semibold"
            >
              Back
            </button>
            <button
              onClick={handleRegistration}
              className="border w-full text-sm py-2 rounded-lg text-white bg-redText font-semibold"
            >
              Complete registration
            </button>
          </div>
        </div>
      </>
    );
  };

  const handleBack = () => {
    setShowSecondStep(false);
  };

  const handleRegistration = async () => {
    try {
      // Make an HTTP POST request to your server with the email and password
      const response = await Axios.post("https://localhost:7119/api/Register", {
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      });

      // Handle the server response as needed
      console.log(response.data); // You may want to do something more meaningful here

      login(response.data.accessToken);

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleFirstStep = () => {
    setShowSecondStep(true);
  };

  return (
    <>
      <div className="flex absolute h-full">
        <div className="flex items-center">
          <div className="bg-greyBody h-full items-center flex flex-1">
            {/* shadow-[rgba(0,0,15,0.25)_4px_0px_4px_2px] */}
            <div className="mx-36 space-y-12">
              <div className="text-4xl text-greyHeader font-bold">
                Join <span className="text-redText">thousands </span> of
                <span className="text-redText"> sellers</span> from around the
                world
              </div>
              <div className="text-center">
                {showSecondStep ? secondStep() : firstStep()}
                <p className="mt-2 text-greyHeader text-opacity-80 font-semibold text-xs">
                  Already have an account?{" "}
                  <Link to="../Login" className="text-greyHeader">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-2 h-full bg-red-200">
            <img src={Background} className="object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;