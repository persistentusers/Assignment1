import React, { useEffect, useState } from "react";

const ScheduleAPI = () => {
  const [activeTab, setActiveTab] = useState({ apiname: "", time: "" });

  const Schedular_Result = [
    {
      Property: "ID",
      Comparison: "Equal",
      Target: "2",
      Result: "Pass",
    },
    {
      Property: "Name",
      Comparison: "Equal",
      Target: "Manoj",
      Result: "Fail",
    },
  ];

  const scheduleDetails = localStorage.getItem("scheduledetails");
  const apiData = JSON.parse(scheduleDetails);

  useEffect(() => {
    setActiveTab({
      ...activeTab,
      apiname: apiData?.apiName,
      time: apiData?.time,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onActiveTabChange = (tabInfo) => {
    setActiveTab({
      ...activeTab,
      apiname: tabInfo?.apiName,
      time: tabInfo?.time,
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
            activeTab?.apiname === apiData?.apiName ? "bg-[#aaada9]" : "bg-none"
          }`}
        >
          {apiData.apiName}
        </div>
      </div>
      <div id={activeTab?.name} className="pt-4">
        <h3 className="font-bold text-center">
          API Name - {activeTab?.apiname} || Time - {activeTab?.time}
        </h3>

        <h3 className="ml-64 text-lg font-bold"> Validations </h3>
        <table className="mt-8 ml-96">
          <thead>
            <tr>
              <th>Property</th>
              <th>Comparison</th>
              <th>Target Value</th>
              <th>Pass / Fail</th>
            </tr>
          </thead>
          <tbody>
            {Schedular_Result.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.Property}</td>
                <td>{schedule.Comparison}</td>
                <td>{schedule.Target}</td>
                <td>{schedule.Result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ScheduleAPI;
