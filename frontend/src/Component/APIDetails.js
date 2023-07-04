import axios from "axios";
import React, { useEffect, useState } from "react";

const APIDetails = () => {
  const [activeTab, setActiveTab] = useState({ name: "", url: "" });
  const [detailsTab, setDetailsTab] = useState("");
  const [details, setDetails] = useState({});

  const apiDetails = localStorage.getItem("apiDetails");
  const apiData = JSON.parse(apiDetails);

  useEffect(() => {
    setActiveTab({
      ...activeTab,
      name: apiData?.apiName,
      url: apiData?.endPoint,
    });
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
      }
      if (activeDetail === "request") {
        setDetails({
          ...details,
          data: { ...reqConfig, ...reqHeaders },
        });
      }
    });
  };

  return (
    <div className="mt-4 bg-white shadow-lg h-96 shadow-black">
      <div className="float-left border border-black border-solid h-full bg-[#ccc] w-48">
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
        <h3 className="font-bold text-center">API URL - {activeTab?.url}</h3>
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

        <div className="relative pt-16 pl-4 overflow-auto h-80">
          <pre>{JSON.stringify(details?.data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default APIDetails;
