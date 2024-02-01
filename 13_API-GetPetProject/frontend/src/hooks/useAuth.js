import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import writeLog from "../utils/write-log";

export default function useAuth() {
  async function register(user) {
    try {
      await api.post("/users/register", user).then((response) => {
        writeLog(
          "DEB",
          `Axios: Called API to register user
            and received: ${JSON.stringify(response)}`
        );
        return response.data;
      });
    } catch (error) {
      writeLog(
        "DEB",
        `AxiosERROR: Called API to register user
            and received ERROR: ${error}`
      );
    }
  }

  return { register };
}
