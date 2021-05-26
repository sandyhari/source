import axios from "axios";

function axiosConfiguration() {
  const max_time = 3;
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
}

const numberFormat = (num) => {
  let curr = num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  curr = curr.substring(1);
  return curr.slice(0, -3);
};

export { axiosConfiguration, numberFormat };
