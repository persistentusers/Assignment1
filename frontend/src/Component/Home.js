import React, { useState } from "react";

import { Modal } from "./Modal";

const Home = () => {
  const [inputName, setInputName] = useState("");

  const [apiName, setApiName] = useState("");

  const [errorMessage, seterrorMessage] = useState("");

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

  console.log(apiName);

  return (
    <>
      <div className="mt-48 ">
        <input
          value={inputName}
          onChange={(e) => {
            onInputAPIChange(e);
          }}
          className="w-4/12 px-8 py-4 text-sm border-none rounded-lg shadow-md shadow-black"
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

        {apiName && <Modal apiName={apiName} onClose={() => setApiName("")} />}

        {errorMessage && (
          <p className="mt-2 ml-2 text-lg font-bold text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
