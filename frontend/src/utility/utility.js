import axios from "axios";


export const apisData = [
    {
        "id": "8",
        "name": "NameAPiricky"
    },
    {
        "id": "11",
        "name": "tusharMorty"
    },
    {
        "id": "6",
        "name": "apiName"
    },
    {
        "id": "9",
        "name": "tushar"
    },
    {
        "id": "3",
        "name": "rickmortypia"
    },
    {
        "id": "13",
        "name": "mortyrickyapiname"
    },
    {
        "id": "2",
        "name": "rickMortyapi"
    },
    {
        "id": "4",
        "name": "rickmorty"
    },
    {
        "id": "7",
        "name": "nameapi"
    },
    {
        "id": "1",
        "name": "mortyrick"
    }
];

export const getAllScheduleData = (data, allApiData) => {
    const normalizeApiData = allApiData.split("-").join().split("#");
    const apisData = normalizeApiData
      .filter((str) => str)
      .map((obj) => {
        const apiName = obj.split(",");
        return { id: apiName?.[0], name: apiName?.[1] };
      });
    // const filterdata = data.split(",").filter(o => o);
    data?.split(",").filter(o => o);
    const normalizeData = data?.split(",").filter(o => o).map( obj => {
      const testData = obj?.split("#");
      return {
          statusId: testData?.[0],
          date: testData?.[1],
          apiId: testData?.[2],
          status: testData?.[3]
      }
    })
   return normalizeData.map( obj => {
        const test = apisData?.find(f => obj.apiId === f.id);
        return {...obj,...test }
    })
}

export const minutesDiff = (value) => {
    const dateTimeValue2 = new Date();
    const dateTimeValue1 = new Date(value);
    var differenceValue =(dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
    differenceValue /= 60;
    return Math.abs(Math.round(differenceValue));
 }

 export const fetchNames = async () => {

    try {
      const res = await Promise.all([
        axios.get("http://localhost/cgi-bin/getApiStatusAll.cgi"),
        axios.get("http://localhost/cgi-bin/getApi.cgi")
      ]);
      const data = res?.map((res) => res.data);
      console.log(data);
      return data?.flat();
    } catch {
      throw Error("Promise failed");
    }
  };

  export const getApiDetails = response => {

    const [apiName, apiUrl, comparisonId, comparisonName] =  response?.split("#");
const data = {

    apiName: apiName || "",

    apiUrl: apiUrl || "",

    scheduleResult: [

        {

            Property: 'ID',

            Comparison: "Equal",

            Target: comparisonId || "",

            Result: 'Pass'

          },

          {

            Property: 'Name',

            Comparison: "Equal",

            Target: comparisonName || "",

            Result: 'Pass'

          },
    ]
}

return data;
  }
