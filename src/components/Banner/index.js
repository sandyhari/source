import HospitalInfo from "../../pages/HospitalInfo";
import IndiaWise from "../../pages/IndiaWise/index";
import Vaccination from "../../pages/Vaccination/index";
import "./index.css";

const Banner = () => {
  return (
    <>
      <div className="banner_main">
        <div className="banner_content">
          <div className="banner_title">
            <h2>Hospital Info</h2>
          </div>
          <HospitalInfo />
        </div>
        <div className="banner_content">
          <div className="banner_title">
            <h2>Cases Info</h2>
          </div>
          <IndiaWise />
        </div>
      </div>
      <div className="banner_vaccine">
        <div className="banner_vaccine_content">
          <div className="banner_vaccine_content_title">
            <h2>Know vaccine availability information of your local</h2>
          </div>
          <Vaccination />
        </div>
      </div>
    </>
  );
};

export default Banner;
