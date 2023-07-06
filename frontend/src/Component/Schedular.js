import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Schedular = () => {
  const navigate = useNavigate();
  const timeMethods = [
    {
      name: "5 min",
      value: 5,
    },
    {
      name: "10 min",
      value: 10,
    },
    {
      name: "15 min ",
      value: 15,
    },
    {
      name: "20 min",
      value: 20,
    },
    {
      name: "30 min",
      value: 30,
    },
  ];

  const apiMethods = [
    {
      name: "API1",
    },

    {
      name: "API2",
    },
  ];

  const [time, setTime] = useState(5);
  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const [apiName, setApiName] = useState("API1");
  const handleChangeApiName = (event) => {
    setApiName(event.target.value);
  };

  const onSave = () => {
    const data = {
      apiName,
      time,
    };

    localStorage.setItem("scheduledetails", JSON.stringify(data));
    alert(JSON.stringify(data));
    // navigate("/sheduleapi");
  };
  return (
    <div className="items-center p-2 text-center bg-white rounded">
      <div className="py-6 text-xl font-bold ">Schedule API Test </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-center py-6 m-4 text-xl">
          <div className="m-3"> API </div>
          <select
            value={apiName}
            onChange={handleChangeApiName}
            className="px-3 mr-1 text-base border rounded-lg border-grey"
          >
            {apiMethods.map((method) => (
              <option key={method.name} value={method.name}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row justify-center py-6 m-4 text-xl">
          <div className="m-3">Frequency </div>
          <select
            value={time}
            onChange={handleChange}
            className="px-3 mr-1 text-base border rounded-lg border-grey"
          >
            {timeMethods.map((method) => (
              <option key={method.name} value={method.value}>
                {method.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="w-24 h-12 ml-4 text-sm text-white rounded-lg bg-sky-700"
        onClick={() => onSave()}
      >
        Save Schedule
      </button>
    </div>
  );
};

export default Schedular;
