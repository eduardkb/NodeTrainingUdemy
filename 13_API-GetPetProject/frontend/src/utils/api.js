import axios from "axios";
import writeLog from "./write-log";
// require("dotenv").config();

function getAxiosURL() {
  const axiosURL = process.env.REACT_APP_API || "http://localhost:5000";
  if (axiosURL === "http://localhost:5000") {
    writeLog(
      "DEB",
      `WARNING: Default backend URL in use: ${axiosURL}. Create .env file.`
    );
  }
  writeLog("DEB", `Axios: URL in use by Axios: ${axiosURL}`);
  return axiosURL;
}

export default axios.create({
  baseURL: getAxiosURL(),
});
