import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import writeLog from "../utils/write-log";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  async function register(user) {
    let msgText = "Cadastro realizado com sucesso";
    let msgType = "success";
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
      msgText = error.response.data.message;
      msgType = "error";
      // if (error.response.data) {
      //   writeLog("DEB", `Register return ERROR data: ${error.response}`);
      //   msgText = error.response.data.message;
      //   msgType = "error";
      // }
    }
    setFlashMessage(msgText, msgType);
  }

  return { register };
}
