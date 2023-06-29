import React from "react";

const APIDetails = () => {
  return (
    <div className="p-4 mt-4 bg-white shadow-lg h-96 shadow-black">
      <div className="float-left ">
        <button
          className="tablinks"
          onclick="openCity(event, 'London')"
          id="defaultOpen"
        >
          API Name
        </button>
      </div>

      <div id="London" className="tabcontent">
        <h3>API URL</h3>
        <p>Request </p>
        <p>Response </p>
      </div>
    </div>
  );
};

export default APIDetails;
