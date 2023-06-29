import React from "react";

const APIDetails = () => {
  return (
    <div className="p-4 mt-4 bg-white shadow-lg h-96 shadow-black">
      <div className="float-left w-1/3 h-96">
        <button
          className="block w-auto font-bold transition tablinks bg-slate-50 text-emerald-200"
          onclick="openCity(event, 'London')"
          id="defaultOpen"
        >
          API Name
        </button>
      </div>

      <div id="apiUrl" className="tabcontent">
        <h3 className="font-bold">API URL - agsdjasgdjkagsdkjg</h3>
        <p>Request </p>
        <p>Response </p>
      </div>
    </div>
  );
};

export default APIDetails;
