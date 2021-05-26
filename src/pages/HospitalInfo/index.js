import axios from "axios";
import React, { useEffect, useState } from "react";
import shortUrls from "../../data/requests/index";
import { axiosConfiguration, numberFormat } from "../../utils/index";
import "./index.css";

const HospitalInfo = () => {
  const [hospitalDetails, setHospitalDetails] = useState({});
  const baseUri = `https://api.rootnet.in/covid19-in/`;
  useEffect(() => {
    async function fetchData() {
      axiosConfiguration();
      await axios
        .get(`${baseUri}${shortUrls.requestUrls.hospitalInfo.beds}`)
        .then((response) => {
          // console.log("===Hospital===");
          // console.log(response.data.data);
          // console.log("===END POINT===");

          setHospitalDetails(response.data.data);
        })
        .catch((error) => {
          if (error.response) {
            throw new Error(`API call Failed ${error}`);
          } else {
            console.log("catching-----------");
            throw new Error();
          }
        });
    }
    fetchData();
  }, [baseUri]);

  return (
    <>
      <div className="currentData_div">
        <div className="data">
          <div className="indiastats_div">
            <table className="table">
              <tbody>
                <tr>
                  <th colSpan="2" scope="row" className="theading">
                    Number of Hospitals
                  </th>
                </tr>
                <tr>
                  <th scope="row" className="theading">
                    Urban
                  </th>
                  <th scope="row" className="theading">
                    Rural
                  </th>
                </tr>
                <tr>
                  <th scope="row">
                    <i className="fas fa-clinic-medical"></i>{" "}
                    {hospitalDetails.summary &&
                    hospitalDetails.summary.urbanHospitals
                      ? numberFormat(hospitalDetails.summary.urbanHospitals)
                      : 0}
                  </th>
                  <th scope="row">
                    <i className="fas fa-clinic-medical"></i>{" "}
                    {hospitalDetails.summary &&
                    hospitalDetails.summary.ruralHospitals
                      ? numberFormat(hospitalDetails.summary.ruralHospitals)
                      : 0}
                  </th>
                </tr>
                <tr>
                  <th scope="row">
                    <i className="fas fa-procedures"></i>{" "}
                    {hospitalDetails.summary &&
                    hospitalDetails.summary.urbanBeds
                      ? numberFormat(hospitalDetails.summary.urbanBeds)
                      : 0}
                  </th>
                  <th scope="row">
                    <i className="fas fa-procedures"></i>{" "}
                    {hospitalDetails.summary &&
                    hospitalDetails.summary.ruralBeds
                      ? numberFormat(hospitalDetails.summary.ruralBeds)
                      : 0}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalInfo;
