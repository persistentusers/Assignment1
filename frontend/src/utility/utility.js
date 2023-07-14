import axios from "axios";

export const getAllScheduleData = (data, allApiData) => {
  const normalizeApiData = allApiData.split("-").join().split("#");
  const apisData = normalizeApiData
    .filter(str => str)
    .map((obj) => {
      const apiName = obj.split(",");
      return { id: apiName?.[0], name: apiName?.[1] };
    });

  const normalizeData = data
    ?.split(",")
    .filter(api => api)
    .map((obj) => {
      const [ statusid, date, apiId, status] = obj?.split("#");
      return {
        statusId: statusid || "",
        date: date || "",
        apiId: apiId || "",
        status: status || "",
      };
    });
  return normalizeData.map((obj) => {
    const test = apisData?.find( api => obj.apiId === api.id);
    return { ...obj, ...test };
  });
};

export const minutesDiff = (value) => {
  const dateTimeValue2 = new Date();
  const dateTimeValue1 = new Date(value);
  var differenceValue =
    (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
  differenceValue /= 60;
  return Math.abs(Math.round(differenceValue));
};

export const fetchNames = async () => {
  try {
    const res = await Promise.all([
      axios.get("http://localhost/cgi-bin/getApiStatusAll.cgi"),
      axios.get("http://localhost/cgi-bin/getApi.cgi"),
    ]);
    const data = res?.map((res) => res.data);
    return data?.flat();
  } catch {
    throw Error("Promise failed");
  }
};

export const getApiDetails = (response) => {
  const [apiName, apiUrl, comparisonId, comparisonName] = response?.split("#");
  const data = {
    apiName: apiName || "",
    apiUrl: apiUrl || "",
    scheduleResult: [
      {
        Property: "ID",
        Comparison: "Equal",
        Target: comparisonId || "",
        Result: "Pass",
      },
      {
        Property: "Name",
        Comparison: "Equal",
        Target: comparisonName || "",
        Result: "Pass",
      },
    ],
  };

  return data;
};

export const headerMethods = [
  {
    name: "GET",
    isDisabled: true,
  },
  {
    name: "POST",
    isDisabled: false,
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

export const timeMethods = [
  {
    name: "5 min",
    value: 5,
  },
  {
    name: "10 min",
    value: 10,
  },
  {
    name: "15 min ",
    value: 15,
  },
  {
    name: "20 min",
    value: 20,
  },
  {
    name: "30 min",
    value: 30,
  },
];
