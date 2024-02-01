import axios from "axios";
import writeLog from "./write-log";
require("dotenv").config();

function getAxiosURL() {
  const axiosURL = process.env.REACT_APP_API || "http://localhost:5000";
  writeLog("DEB", `Axios: URL in use by Axios: ${axiosURL}`);
  return axiosURL;
}

export default axios.create({
  haseUrl: getAxiosURL(),
});
