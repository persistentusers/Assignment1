import "./../App.css";

import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const APIValidation = () => {
  const [resultMessage, setResultMessage] = useState(null);
  const [targetvalue, setTargetValue] = useState(["", ""]);
  const [comparison, setComparison] = useState(["Equals to", "Equals to"]);
  const { state, pathname } = useLocation();
  const navigate = useNavigate();

  const { responseData } = state;
  const apiDetails = localStorage.getItem("apiDetails");
  const apiData = JSON.parse(apiDetails);

  const Info = [
    {
      Property: "id",
    },

    {
      Property: "Name",
    },
  ];

  const headerMethods = [
    {
      name: "Equals to",
      isDisabled: true,
    },
  ];

  const source = [
    {
      name: "JSON Header",
      isDisabled: false,
    },

    {
      name: "JSON Body",
      isDisabled: true,
    },
  ];

  const onSave = () => {
    const data = {
      API_NAME: apiData?.apiName,
      COMPARISON_ID: targetvalue[0],
      COMPARISION_NAME: targetvalue[1],
    };

    axios({
      method: "POST",
      url: "http://localhost/cgi-bin/insertApiValidation.cgi",
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/schedular", { state: { previousPath: pathname } });
      toast.success("Data saved successfully.");
    });

    localStorage.setItem("validationdetails", JSON.stringify(data));
  };

  const handleComparisonChange = (event, i) => {
    const updatedComparison = [...comparison];
    updatedComparison[i] = event.target.value;
    setComparison(updatedComparison);
  };

  const handleChangetargetvalue = (event, i) => {
    const updatedValues = [...targetvalue];
    updatedValues[i] = event.target.value;
    setTargetValue(updatedValues);
  };

  const onRun = () => {
    const comparisonResults = [
      {
        value: targetvalue[0],
        method: comparison[0],
        comparisonResult: performComparison(
          responseData.id,
          targetvalue[0],
          comparison[0]
        ),
      },

      {
        value: targetvalue[1],
        method: comparison[1],
        comparisonResult: performComparison(
          responseData.name,
          targetvalue[1],
          comparison[1]
        ),
      },
    ];

    const result = comparisonResults.some((obj) => !obj.comparisonResult);
    setResultMessage(result);
  };

  const performComparison = (propertyValue, targetValue, method) => {
    if (method === "Equals to") {
      const comparisonResult =
        propertyValue.toString() === targetValue.toString();

      return comparisonResult;
    }
    // Add more comparison methods as needed

    return false;
  };
  console.log(resultMessage);

  const isSaveButtonDisabled = targetvalue.some((value) => value.trim() === "");
  const isRunButtonDisabled = targetvalue.some((value) => value.trim() === "");

  return (
    <>
      <div className="grid items-center place-items-center">
        <div className="mt-4 bg-white shadow-lg h-96 shadow-black">
          <table className="mt-20 table-validation">
            <thead>
              <tr>
                <th>Source</th>
                <th>Property</th>
                <th>Comparison</th>
                <th>Target Value</th>
              </tr>
            </thead>

            <tbody>
              {Info.map((val, i) => (
                <tr key={i}>
                  <td>
                    {" "}
                    <select className="px-3 mr-1 border rounded-lg border-grey">
                      {source.map((method) => (
                        <option key={method.name} value={method.name}>
                          {method.name}
                        </option>
                      ))}
                    </select>{" "}
                  </td>

                  <td>{val.Property}</td>

                  <td>
                    {" "}
                    <select
                      value={comparison[i]}
                      onChange={(event) => handleComparisonChange(event, i)}
                      className="px-3 mr-1 border rounded-lg border-grey"
                    >
                      {headerMethods.map((method) => (
                        <option key={method.name} value={method.name}>
                          {method.name}
                        </option>
                      ))}
                    </select>{" "}
                  </td>

                  <td>
                    {" "}
                    <input
                      value={targetvalue[i]}
                      onChange={(event) => handleChangetargetvalue(event, i)}
                      className="w-2/3 px-8 py-4 text-sm border-none rounded-lg shadow-md shadow-black"
                      type="text"
                      placeholder="Enter Target Value"
                    />{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center p-4 space-x-4">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={onSave}
              disabled={isSaveButtonDisabled}
            >
              Save
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
              onClick={onRun}
              disabled={isRunButtonDisabled}
            >
              Run
            </button>
          </div>

          {resultMessage !== null && (
            <div
              className={`pl-4 text-md font-bold ${
                resultMessage === false ? "text-green-500" : "text-red-500"
              }`}
            >
              Result: {resultMessage === false ? "Test Pass" : "Test Fail"}
            </div>
          )}
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default APIValidation;
