import axios from "axios";
import React, { useEffect, useState } from "react";

const APIDetails = () => {
  const [activeTab, setActiveTab] = useState({ name: "", url: "" });
  const [detailsTab, setDetailsTab] = useState("");
  const [details, setDetails] = useState({});

  useEffect(() => {
    setActiveTab({
      ...activeTab,
      name: apiData[0]?.apiName,
      url: apiData[0]?.apiUrl,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiData = [{ apiName: "apiName1 ", apiUrl: "apiUrl1" }];

  const onActiveTabChange = (tabInfo) => {
    setActiveTab({
      ...activeTab,
      name: tabInfo?.apiName,
      url: tabInfo?.apiUrl,
    });
  };

  const onActiveDetails = (activeDetail) => {
    setDetailsTab(activeDetail);
    axios({
      method: "get",
      url: "https://rickandmortyapi.com/api/character/2",
    }).then((response) => {
      console.log(response);
      const res = response?.data;
      const req = response?.request;

      if (activeDetail === "response") {
        setDetails({
          ...details,
          data: res,
        });
      }
      if (activeDetail === "request") {
        setDetails({
          ...details,
          data: req,
        });
      }
    });
  };
  console.log(activeTab, "activeTab", details);

  return (
    <div className="mt-4 bg-white shadow-lg h-96 shadow-black">
      <div className="float-left border border-black border-solid h-full bg-[#ccc] w-48">
        {apiData?.map((info) => {
          return (
            <div
              onClick={() => {
                onActiveTabChange(info);
              }}
              className={`block p-4 font-bold text-black transition  ${
                activeTab?.name === info?.apiName ? "bg-[#aaada9]" : "bg-none"
              }`}
              id={info}
            >
              {info.apiName}
            </div>
          );
        })}
      </div>

      <div id={activeTab?.name} className="pt-4">
        <h3 className="font-bold">API URL - {activeTab?.url}</h3>
        <div className="flex gap-2 pl-4">
          <div
            className={`block w-auto cursor-pointer ${
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
          {/* <div>
            <div className="pt-16">
              <pre>{JSON.stringify(details?.data, null, 1)}</pre>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default APIDetails;
