import React, { useEffect, useState } from "react";
import axios from "axios";

const APIReport = () => {
  const [report, setReport] = useState([]);

  const fetchUserData = () => {
    axios({
      method: "get",
      url: "http://localhost/cgi-bin/getApiReport.cgi",
    }).then((res) => {
      const normalizeData = res?.data?.split("-").join().split("#");
      const apisData = normalizeData.filter((str) => str);
      const getData = {
        hits: apisData?.[0],
        success: apisData?.[1],
        fail: apisData?.[2],
        time: apisData?.[3],
      };

      setReport(getData);
    });
    // const data = {
    //   hits: 10,
    //   success: 7,
    //   fail: 3,
    //   time: 2.2,
    // };
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  console.log(report);
  return (
    <div className="flex flex-col p-8 bg-white rounded text-md ">
      <div className="font-bold text-center">API Report</div>

      <div>Number of hits : {report.hits}</div>
      <div> API Success Response Time : {report.time} Sec </div>
      <div>
        Validation Pass/Fail : {report.success} / {report.fail}
      </div>
      <div>
        Result Count : {parseInt(report.success) + parseInt(report.fail)}{" "}
      </div>
    </div>
  );
};
export default APIReport;
