import "./../App.css";
import React from "react";

const APIValidation = () => {
  const data = [
    {
      Property: "....",
    },
    {
      Property: "....",
    },
  ];

  const headerMethods = [
    {
      name: "Equals to",
      isDisabled: false,
    },

    {
      name: "Less than equals to",
      isDisabled: true,
    },
    {
      name: "Greater than equals to",
      isDisabled: true,
    },
    {
      name: "Not equals to",
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

  return (
    <div className="table-container table-centre">
      <div div className="mt-4 bg-white shadow-lg h-96 shadow-black">
        <table className="margin">
          <thead>
            <tr>
              <th>Source</th>
              <th>Property</th>
              <th>Comparison</th>
              <th>Target Value</th>
            </tr>
          </thead>

          <tbody>
            {data.map((val, i) => (
              <tr>
                <td>
                  {" "}
                  <select className="px-3 mr-1 border rounded-lg border-grey">
                    {source.map((method) => (
                      <option key={method.name} value={method.name}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td>{val.Property}</td>

                <td>
                  {" "}
                  <select className="px-3 mr-1 border rounded-lg border-grey">
                    {headerMethods.map((method) => (
                      <option key={method.name} value={method.name}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  {" "}
                  <input
                    className="w-2/3 px-8 py-4 text-sm border-none rounded-lg shadow-md shadow-black"
                    type="text"
                    placeholder="Enter Target Value"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center p-4 space-x-4">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Save
          </button>
          <button className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
            Run
          </button>
        </div>
      </div>
    </div>
  );
};

export default APIValidation;
