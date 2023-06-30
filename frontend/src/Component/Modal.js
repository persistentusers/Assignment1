import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Modal = ({ apiName, onClose }) => {
  const [methodName, setMethodName] = useState("GET");
  const [endPoint, setEndPoint] = useState("");
  const navigate = useNavigate();
  const headerMethods = [
    {
      name: "GET",
      isDisabled: false,
    },
    {
      name: "POST",
      isDisabled: true,
    },
    {
      name: "PUT",
      isDisabled: true,
    },
    {
      name: "DELETE",
      isDisabled: true,
    },
    {
      name: "PATCH",
      isDisabled: true,
    },
  ];
  const handleChange = (event) => {
    setMethodName(event.target.value);
  };

  const changeApiName = (e) => {
    setEndPoint(e.target.value);
  };

  const onSave = () => {
    const data = {
      apiName,
      methodName,
      endPoint,
    };
    alert(JSON.stringify(data));
    navigate("/apiDetails");
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur">
        <div className="w-[700px] flex flex-col">
          <button
            className="text-xl text-white place-self-end"
            onClick={() => onClose()}
          >
            X
          </button>
          <div className="p-2 bg-white rounded">
            <div className="py-6">Fetch API DATA</div>
            <div className="flex flex-row">
              <select
                value={methodName}
                onChange={handleChange}
                className="px-3 mr-1 border rounded-lg border-grey"
              >
                {headerMethods.map((method) => (
                  <option value={method.name} disabled={method.isDisabled}>
                    {method.name}
                  </option>
                ))}
              </select>
              <input
                value={endPoint}
                onChange={(e) => {
                  changeApiName(e);
                }}
                className="w-5/6 px-3 py-3 text-sm border rounded-lg border-grey"
                type="text"
                placeholder="Please add api end Point"
              />
            </div>
            <div className="flex flex-row justify-end py-6">
              <button
                className="w-24 h-12 ml-4 text-sm text-white rounded-lg bg-sky-700"
                onClick={() => onClose()}
              >
                close
              </button>
              <button
                className="w-24 h-12 ml-4 text-sm text-white rounded-lg bg-sky-700"
                onClick={() => onSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
