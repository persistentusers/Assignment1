import React, { useEffect, useState } from "react";

const APIReport = () => {
  const [report, setReport] = useState([]);

  const fetchUserData = () => {
    const data = {
      hits: 10,
      success: 7,
      fail: 3,
      time: 2.2,
    };
    setReport(data);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col p-8 text-lg bg-white rounded ">
      <div className="font-bold text-center">API Report</div>

      <div>Number of hits : {report.hits}</div>
      <div> API Success Response Time : {report.time} Sec </div>
      <div>
        Validation Pass/Fail : {report.success} / {report.fail}
      </div>
      <div>Result Count : {report.success + report.fail} </div>
    </div>
  );
};
export default APIReport;
