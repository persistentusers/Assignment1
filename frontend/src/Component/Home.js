import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from "./Modal";

const Home = () => {
  const [inputName, setInputName] = useState("");
  const [apiName, setApiName] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();

  const onInputAPIChange = (e) => {
    const value = e.target.value;

    setInputName(value);
  };

  const onSubmitAPIName = () => {
    if (/[!@#$%^&*(),.?"{}|<>]/.test(inputName)) {
      seterrorMessage("*Special characters are not allowed.");
    } else if (inputName.trim() === "") {
      seterrorMessage("*API Name is required.");
    } else if (!/^[^0-9]*$/.test(inputName)) {
      seterrorMessage("*Integer values are not allowed.");
    } else {
      setApiName(inputName);

      seterrorMessage("");
    }
  };

  const onHandlerSchedular = () => {
    navigate("/schedular");
  };

  return (
    <>
      <div className="block m-auto boxwidth h-80">
        <div className="flex gap-2">
          <input
            value={inputName}
            onChange={(e) => {
              onInputAPIChange(e);
            }}
            className="w-4/12 px-3 py-4 text-sm border-none rounded-lg shadow-md shadow-black"
            type="text"
            placeholder="Please Add API Name"
          />
          <button
            className="w-24 h-12 ml-4 text-sm text-white rounded-lg bg-sky-700"
            onClick={() => {
              onSubmitAPIName();
            }}
          >
            Create API
          </button>

          <button
            className="w-24 h-12 ml-4 text-sm text-white rounded-lg bg-sky-700"
            onClick={() => {
              onHandlerSchedular();
            }}
          >
            Schedular
          </button>
        </div>
        {errorMessage && (
          <p className="mt-2 text-sm font-bold text-red-500">{errorMessage}</p>
        )}

        {apiName && <Modal apiName={apiName} onClose={() => setApiName("")} />}
      </div>
    </>
  );
};

export default Home;
