import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import shortUrls from "../../data/requests/index";
import { axiosConfiguration, numberFormat } from "../../utils/index";

import Statewise from "../StateWise/index";
import "./index.css";

const Content = () => {
  const [value, setValue] = useState({});
  const baseUri = `https://api.rootnet.in/covid19-in/`;

  useEffect(() => {
    async function fetchData() {
      axiosConfiguration();
      await axios
        .get(`${baseUri}${shortUrls.rawUnofficialData.stateWiseUri}`)
        .then((response) => {
          // console.log("==================");
          // console.log(response.data.data);
          // console.log("==================");
          setValue(response.data.data);
        })
        .catch((error) => {
          if (error.response) {
            throw new Error(`API call Failed ${error}`);
          } else {
            console.log("catching-----------");
            throw new Error();
          }
        });

      return;
    }
    fetchData();
  }, [baseUri]);

  return (
    <>
      <div className="currentData_div">
        <div className="data">
          <div className="dayStyle">
            <h6>
              cases as on{" "}
              {value.lastRefreshed
                ? moment(value.lastRefreshed).format("DD-MM-YYYY")
                : "fetch fail"}{" "}
            </h6>
          </div>
          <div className="indiastats_div">
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row" className="theading">
                    Confirmed
                  </th>
                  <th scope="row">
                    {value.total && value.total.confirmed
                      ? numberFormat(value.total.confirmed)
                      : 0}
                  </th>
                </tr>
                <tr>
                  <th scope="row" className="theading">
                    Active
                  </th>
                  <th scope="row">
                    {value.total && value.total.active
                      ? numberFormat(value.total.active)
                      : 0}
                  </th>
                </tr>
                <tr>
                  <th scope="row" className="theading">
                    Recovered
                  </th>
                  <th scope="row">
                    {" "}
                    {value.total && value.total.recovered
                      ? numberFormat(value.total.recovered)
                      : 0}
                  </th>
                </tr>
                <tr>
                  <th scope="row" className="theading">
                    Deaths
                  </th>
                  <th scope="row">
                    {value.total && value.total.deaths
                      ? numberFormat(value.total.deaths)
                      : 0}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <hr className="horizontal" /> */}
      {/* <Statewise params={value} />
      <HospitalInfo /> */}
    </>
  );
};

export default Content;
