import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { timeMethods } from "../utility/utility";



const Schedular = () => {
  const [time, setTime] = useState(5);
  const [apiName, setApiName] = useState({ id: "", name: "" });
  const [apidata, setApiData] = useState([]);
  const location = useLocation();

  const apiDetails = localStorage.getItem("apiDetails");
  const apiData = JSON.parse(apiDetails);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost/cgi-bin/getApi.cgi",
    })
      .then(response => {
        const normalizeData = response?.data?.split("-").join().split("#");
        const apisData = normalizeData
          .filter((str) => str)
          .map((obj) => {
            const apiName = obj.split(",");
            return { id: apiName?.[0], name: apiName?.[1] };
          });
        setApiData(apisData);
        if (location?.state) {
          if (location?.state?.previousPath === "/apiValidation") {
            const filteredData = apisData?.find((res) => {
              return res?.name === apiData?.apiName;
            });

            setApiName({
              id: filteredData?.id,
              name: filteredData?.name,
            });
          } else {
            setApiName({
              id: apisData.length > 0 ? apisData[0]?.id : "",
              name: apisData.length > 0 ? apisData[0]?.name : "",
            });
          }
        }
      })
      .catch((error) => console.log("failed to fetch Api", error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const handleChangeApiName = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const id = el.getAttribute("id");
    setApiName({ id, name: e.target.value });
  };

  const onSave = () => {
    const data = {
      ...apiName,
      time,
    };

    const payload = {
      API_ID: apiName?.id,
      SCHEDULAR_TIME: String(time),
    };
    axios({
      method: "post",
      url: "http://localhost/cgi-bin/insertApiScheduler.cgi",
      data: payload,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/scheduleApi");
      })
      .catch(() => toast.error("Error occurred"));

    localStorage.setItem("scheduledetails", JSON.stringify(data));
  };

  return (
    <>
      <div className="items-center p-2 text-center bg-white rounded">
        <div className="py-6 text-xl font-bold ">Schedule API Test </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-row justify-center py-6 m-4 text-xl">
            <div className="m-3"> API </div>
            <select
              value={apiName?.name}
              onChange={(e) => handleChangeApiName(e)}
              className="px-3 mr-1 text-base border rounded-lg border-grey "
            >
              {apidata.map((method) => (
                <option key={method.name} value={method.name} id={method.id}>
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
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default Schedular;
