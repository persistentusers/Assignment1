import React, { useState } from "react";

import { Modal } from './Modal';
 
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
          className="w-4/12 px-8 py-4 text-sm border-none rounded-lg shadow-lg shadow-black"
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
       { apiName && <Modal apiName={apiName} onClose={() => setApiName("")}/>}
      </div>
    </>
  );
};

export default Home;
