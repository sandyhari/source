const endPoints = {
  requestUrls: {
    caseCounts: {
      latest: "stats/latest",
      history: "stats/history",
    },
    testingStats: {
      latest: "stats/testing/latest",
      history: "stats/testing/history",
      raw: "stats/testing/raw",
    },
    hospitalInfo: {
      beds: "hospitals/beds",
      medicalColleges: "hospitals/medical-colleges",
    },
  },
  rawUnofficialData: {
    stateWiseUri: "unofficial/covid19india.org/statewise",
  },
  vaccination: {
    uri: "v2/appointment/sessions/public/findByPin",
  },
};

export default endPoints;
