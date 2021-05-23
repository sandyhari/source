import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import shortUrls from "../../data/requests/index";
import Statewise from "../StateWise/index";
import "./index.css";

const Content = () => {
  const [value, setValue] = useState({});
  const baseUri = `https://api.rootnet.in/covid19-in/`;

  useEffect(() => {
    const max_time = 3;
    // const retry_status_code = options.retry_status_code;
    let counter = 0;
    axios.interceptors.response.use(null, (error) => {
      const config = error.config;
      if (counter < max_time) {
        counter++;
        console.log(`retring ${counter}`);
        return new Promise((resolve) => {
          resolve(axios(config));
        });
      }
      return Promise.reject(error);
    });

    async function fetchData() {
      await axios
        .get(`${baseUri}${shortUrls.rawUnofficialData.stateWiseUri}`)
        .then((response) => {
          console.log("==================");
          console.log(response.data.data);
          console.log("==================");

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
  }, []);

  const numberFormat = (num) => {
    let curr = num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    curr = curr.substring(1);
    return curr.slice(0, -3);
  };

  return (
    <>
      <div className="currentData_div">
        <div className="title">
          <h1> INDIA </h1>
        </div>
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
            <table>
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
      <hr className="horizontal" />
      <Statewise params={value} />
      {/* <div className="currentData_div">
        <div className="title">
          <h2>Statewise</h2>
        </div>
        <div className="statewiseStats_div">
          <table>
            <thead>
              <tr>
                <th scope="col">State Name</th>
                <th scope="col">Confirmed</th>
                <th scope="col">Active</th>
                <th scope="col">Recovered</th>
                <th scope="col">Deaths</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(value.statewise)
                ? value.statewise.map((e, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{e.state}</th>
                        <td>{e.confirmed}</td>
                        <td>{e.active}</td>
                        <td>{e.recovered}</td>
                        <td>{e.deaths}</td>
                      </tr>
                    );
                  })
                : 0}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default Content;
