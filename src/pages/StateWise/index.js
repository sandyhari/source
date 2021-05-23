import "./index.css";

const Statewise = (params) => {
  const stateData = params.params.statewise;

  return (
    <div className="currentData_div">
      <div className="title">
        <h2>Statewise</h2>
      </div>
      {stateData ? (
        <div className="statewiseStats_div">
          {stateData.map((e, i) => {
            return (
              <div className="accordion" id={`accordionExample${i}`} key={i}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`headingOne`}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseOne${i}`}
                      aria-expanded="true"
                      aria-controls={`collapseOne${i}`}
                    >
                      {e.state}
                    </button>
                  </h2>
                  <div
                    id={`collapseOne${i}`}
                    className="accordion-collapse collapse show"
                    aria-labelledby={`headingOne`}
                    data-bs-parent={`#accordionExample${i}`}
                  >
                    <div className="accordion-body">
                      <b>Confirmed</b> : <i>{e.confirmed}</i>
                      <br />
                      <b>Active</b> : <i>{e.active}</i>
                      <br />
                      <b>Recovered</b> : <i>{e.recovered}</i>
                      <br />
                      <b>Deaths</b> : <i>{e.deaths}</i>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <table>
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
              {stateData.map((e, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{e.state}</th>
                    <td>{e.confirmed}</td>
                    <td>{e.active}</td>
                    <td>{e.recovered}</td>
                    <td>{e.deaths}</td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      ) : (
        <h3>Fetch failed</h3>
      )}
    </div>
  );
};

export default Statewise;
