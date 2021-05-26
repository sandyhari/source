import axios from "axios";
import moment from "moment";
import { axiosConfiguration, numberFormat } from "../../utils/index";
import React, { useEffect, useState } from "react";
import shortUrls from "../../data/requests/index";
import "./index.css";

const Vaccination = () => {
  const [value, setValue] = useState([]);

  const [input, setInput] = useState("");
  const baseUri = `https://cdn-api.co-vin.in/api/`;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (input && input.length === 6) {
      fetchData();
    } else {
      alert("Enter correct pincode");
    }
  };

  async function fetchData() {
    axiosConfiguration();
    const query = {
      pincode: input,
      date: moment().format("DD-MM-YYYY"),
    };
    await axios
      .get(`${baseUri}${shortUrls.vaccination.uri}`, { params: query })
      .then((response) => {
        console.log(response.data.sessions);
        setValue(response.data.sessions);
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
  return (
    <>
      <div className="formed">
        <form className="row">
          <div className="col-10">
            {/* <label for="pincodeEntry" className="form-label">
            Enter your 6 - digit PINCODE
          </label> */}
            <input
              type="number"
              maxLength="6"
              className="form-control"
              id="pincodeEntry"
              placeholder="Enter your 6 - digit PINCODE"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={handleSubmit}
            >
              Get Info
            </button>
          </div>
        </form>
      </div>
      <>
        <div className="row row-cols-1 row-cols-md-3">
          {value && Array.isArray(value) ? (
            value.map((item, index) => {
              return (
                <div className="col" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">{item.block_name}</h3>
                      <p className="card-text">
                        Center ID : <b>{item.center_id}</b>
                      </p>
                      <p className="card-text">
                        Address of the centre : <b>{item.address}</b>
                      </p>
                      <p className="card-text">
                        Minimum Age Allowed : <b>{item.min_age_limit}</b>
                      </p>
                    </div>
                    <div className="card-body dosage">
                      <h4 className="card-title">
                        Dosage information at the center
                      </h4>
                      <p className="card-text">
                        Vaccine Provided : <span>{item.vaccine}</span>
                      </p>
                      <p className="card-text">
                        Total Available Capacity : {item.available_capacity}
                      </p>
                      <p className="card-text">
                        Dose 1 capacity : {item.available_capacity_dose1}
                      </p>
                      <p className="card-text">
                        Dose 2 capacity : {item.available_capacity_dose2}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      `No data received for ${input} pincode.`
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default Vaccination;
