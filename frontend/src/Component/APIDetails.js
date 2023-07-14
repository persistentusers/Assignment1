import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const APIDetails = () => {
  const [activeTab, setActiveTab] = useState({ name: "", url: "" });
  const [detailsTab, setDetailsTab] = useState("");
  const [details, setDetails] = useState({});
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  const apiDetails = localStorage.getItem("apiDetails");
  const apiData = JSON.parse(apiDetails);

  useEffect(() => {
    setActiveTab({
      ...activeTab,
      name: apiData?.apiName,
      url: apiData?.endPoint,
    });
    onActiveDetails("response");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onActiveTabChange = (tabInfo) => {
    setActiveTab({
      ...activeTab,
      name: tabInfo?.apiName,
      url: tabInfo?.endPoint,
    });
  };

  const onActiveDetails = (activeDetail) => {
    setDetailsTab(activeDetail);

    axios({
      method: apiData?.methodName,
      url: apiData?.endPoint,
    }).then((response) => {
      const res = response?.data;
      const reqHeaders = response?.headers;
      const reqConfig = response?.config;

      if (activeDetail === "response") {
        setDetails({
          ...details,
          data: res,
        });
        setResponseData(res);
      }
      if (activeDetail === "request") {
        setDetails({
          ...details,
          data: { ...reqConfig, ...reqHeaders },
        });
      }
    });
  };

  const navigateToValidation = () => {
    navigate("/apiValidation", { state: { responseData } }); /// new
  };

  return (
    <div className="mt-4 bg-white shadow-lg h-96 shadow-black">
      <div className="float-left border border-black border-solid h-full bg-[#ccc]">
        <div
          onClick={() => {
            onActiveTabChange(apiData);
          }}
          className={`p-4 font-bold text-black transition  ${
            activeTab?.name === apiData?.apiName ? "bg-[#aaada9]" : "bg-none"
          }`}
        >
          {apiData.apiName}
        </div>
      </div>

      <div id={activeTab?.name} className="pt-4">
        <div className="flex pl-4">
          <span className="font-bold text-green-500 grow ">
            Status: Success
          </span>
          <h3 className="font-bold grow">API URL - {activeTab?.url}</h3>
        </div>
        <div
          className="flex justify-between pr-8 "
          style={{ marginBottom: "-8px" }}
        >
          <div className="flex gap-2 pl-4">
            <div
              className={`w-auto cursor-pointer ${
                detailsTab === "request" ? "text-blue-500" : ""
              }`}
              onClick={() => {
                onActiveDetails("request");
              }}
            >
              Request{" "}
            </div>
            <div
              className={`block w-auto cursor-pointer ${
                detailsTab === "response" ? "text-blue-500" : ""
              }`}
              onClick={() => {
                onActiveDetails("response");
              }}
            >
              Response{" "}
            </div>
          </div>
          <button
            className="w-24 h-8 ml-4 text-sm text-white rounded-lg bg-sky-700"
            onClick={() => {
              navigateToValidation();
            }}
          >
            Validate
          </button>
        </div>

        <div className="relative pt-16 pl-4 overflow-auto h-80">
          <pre>{JSON.stringify(details?.data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default APIDetails;
