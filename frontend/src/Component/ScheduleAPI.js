import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getAllScheduleData,
  minutesDiff,
  fetchNames,
  getApiDetails,
} from "../utility/utility";

export const SheduleAPI = (props) => {
  const [activeTab, setActiveTab] = useState({});
  const [allScheduleApis, setAllScheduleApis] = useState([]);
  const [apisDetails, setApisDetails] = useState(null);

  useEffect(() => {
    fetchNames().then((data) => {
      console.log(data);
      const allscheduleApi = data?.[0] || "";
      const allApiData = data?.[1] || [];

      const finalData = getAllScheduleData(allscheduleApi, allApiData);
      setAllScheduleApis(finalData);
      setActiveTab({
        ...finalData[0],
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost/cgi-bin/getApiStatusId.cgi",
      data: { API_ID: activeTab?.apiId || "" },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((dataResponse) => {
        console.log(dataResponse, "api validate");
        setApisDetails(getApiDetails(dataResponse?.data));
      })
      .catch(() => console.log("Error occurred"));
  }, [activeTab]);

  const onActiveTabChange = (tabInfo) => {
    setActiveTab({
      ...tabInfo,
    });
  };

  return (
    <div className="mt-4 bg-white shadow-lg h-96 shadow-black">
      <div className="float-left border border-black border-solid h-full bg-[#ccc]">
        {allScheduleApis.map((schedule) => (
          <div
            onClick={() => {
              onActiveTabChange(schedule);
            }}
            className={`p-4 font-bold text-black transition  ${
              activeTab?.statusId === schedule?.statusId
                ? "bg-[#827695]"
                : "bg-none"
            }`}
          >
            {schedule?.name}
            <div className="text-xs">{`${minutesDiff(
              schedule?.date
            )} minutes ago`}</div>
          </div>
        ))}
      </div>

      <div id={activeTab?.name} className="flex flex-col p-4">
        <div className="flex flex-col pb-4">
          <h3 className="font-bold text-center">
            API URL - {apisDetails?.apiUrl}{" "}
          </h3>
          <h1
            className={`text-lg font-bold ${
              activeTab?.status === "1" ? "text-green-600" : " text-red-600 "
            }`}
          >
            {activeTab?.status === "1" ? "Passed" : "Failed"}
          </h1>
          <h3 className="text-lg font-bold"> Validations </h3>
        </div>
        <div className="grid items-center">
          <table className="table-schedule">
            <thead>
              <tr>
                <th>Property</th>
                <th>Comparison</th>
                <th>Target Value</th>
              </tr>
            </thead>
            <tbody>
              {apisDetails?.scheduleResult.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.Property}</td>
                  <td>{schedule.Comparison}</td>
                  <td>{schedule.Target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default SheduleAPI;
