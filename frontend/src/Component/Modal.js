import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export const Modal = ({ apiName, onClose }) => {
  const [methodName, setMethodName] = useState("GET");

  const [endPoint, setEndPoint] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

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
    const value = e.target.value;

    setEndPoint(value);
  };

  // const onSave = () => {
  //   if (methodName === "" || endPoint.trim() === "") {
  //     setErrorMessage("*This is a mandatory field.");
  //   } else {
  //     const data = {
  //       apiName,
  //       methodName,
  //       endPoint,
  //     };

  const onSave = () => {
    if (methodName === "" || endPoint.trim() === "") {
      setErrorMessage("*This is a mandatory field.");
    } else if (endPoint.includes(" ")) {
      setErrorMessage("*Space not allowed.");
    } else if (/[!@#$%^&*(),?"{}|<>]/.test(endPoint)) {
      setErrorMessage("*Special characters are not allowed.");
    } else {
      const data = {
        apiName,

        methodName,

        endPoint,
      };

      localStorage.setItem("apiDetails", JSON.stringify(data));

      alert(JSON.stringify(data));

      setErrorMessage("");

      navigate("/apiDetails");
    }
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
                  <option
                    key={method.name}
                    value={method.name}
                    disabled={method.isDisabled}
                  >
                    {method.name}
                  </option>
                ))}
              </select>

              <div style={{ position: "relative", flex: 1 }}>
                <input
                  value={endPoint}
                  onChange={(e) => {
                    changeApiName(e);
                  }}
                  className="px-3 py-3 text-sm border rounded-lg w-100 border-grey"
                  type="text"
                  placeholder="Please add API end Point"
                  style={{ width: "100%" }}
                />

                {errorMessage && (
                  <p
                    style={{
                      position: "absolute",

                      bottom: "-18px",

                      left: 0,

                      color: "#f00",

                      fontSize: "0.75rem",
                    }}
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
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

export default Modal;
