import React from "react";
import Background from "../assets/background.png";

function Body() {
  return (
    <>
      <div className="flex absolute h-full">
        <div className="flex items-center">
          <div className="bg-greyBody h-full items-center flex flex-1">
            {/* shadow-[rgba(0,0,15,0.25)_4px_0px_4px_2px] */}
            <div className="mx-36 space-y-12">
              <div className="text-4xl text-greyHeader font-bold">
                Keep your <span className="text-redText">car</span> intact, buy
                from your <span className="text-redText">favorite </span>
                sellers
              </div>
              <div className="space-y-3">
                <select className="w-full rounded-lg py-2 pl-3 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold">
                  <option>Choose make</option>
                </select>
                <select className="w-full rounded-lg py-2 pl-3 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold">
                  <option>Choose model</option>
                </select>
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
                />
                <button className="border w-full text-sm py-2 rounded-lg text-white bg-redText font-semibold">
                  Search
                </button>
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

export default Body;
