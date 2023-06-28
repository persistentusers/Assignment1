import React, { useState } from "react";

const Home = () => {
  const [inputName, setInputName] = useState("");
  const [apiName, setApiName] = useState("");

  const onInputAPIChange = (e) => {
    setInputName(e.target.value);
  };

  const onSubmitAPIName = () => {
    setApiName(inputName);
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
          className="w-4/12 rounded-lg px-8 py-4 text-sm border-none shadow-lg shadow-black"
          type="text"
          placeholder="Please Add API Name"
        />
        <button
          className="ml-4 w-24 h-12 rounded-lg bg-sky-700 text-white text-sm"
          onClick={() => {
            onSubmitAPIName();
          }}
        >
          Create API
        </button>
      </div>
    </>
  );
};

export default Home;
