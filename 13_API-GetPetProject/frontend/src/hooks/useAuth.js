import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import writeLog from "../utils/write-log";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso";
    let msgType = "success";
    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });
      writeLog(
        "DEB",
        `Axios: Called API to register user
            and received: ${JSON.stringify(data)}`
      );
      await authUser(data);
    } catch (error) {
      writeLog(
        "DEB",
        `AxiosERROR: Called API to register user
            and received ERROR: ${JSON.stringify(error)}`
      );
      if (!error.response) {
        msgText = error.message;
      } else {
        msgText = error.response.data.message;
      }
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }

  function logout() {
    const msgText = "Logout realizado com sucesso";
    const msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/");

    setFlashMessage(msgText, msgType);
  }
  async function login(user) {
    let msgText = "Login realizado com sucesso.";
    let msgType = "success";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });
      await authUser(data);
      writeLog("DEB", `Usuário logado com successo.`);
    } catch (error) {
      writeLog(
        "DEB",
        `Error ao logar usuario. ERR: ${error.response.data.message}`
      );
      msgText = error.response.data.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }
  async function authUser(data) {
    setAuthenticated(true);
    writeLog(
      "DEB",
      `User Logged in. Data.token= ${JSON.stringify(data.token)}`
    );
    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/");
  }
  return { authenticated, register, logout, login };
}
