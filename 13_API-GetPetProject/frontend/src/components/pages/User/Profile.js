import { useState, useEffect } from "react";
import api from "../../../utils/api";
import styles from "./Profile.module.css";
import formStyles from "../../form/form.module.css";
import Input from "../../form/input";
import useFlashMessage from "../../../hooks/useFlashMessage";
import writeLog from "../../../utils/write-log";

function Profile() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  function onFileChange(e) {
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let msgType = "success";
    let message = "Success";

    const formData = new FormData();
    await Object.keys(user).forEach((key) => formData.append(key, user[key]));

    writeLog("DEB", `Changed user: ${JSON.stringify(user)}`);
    writeLog("DEB", `Changed user (formData): ${JSON.stringify(formData)}`);

    const data = await api
      .patch(`/users/edit`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        message = response.data.message;
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        if (err.response.data.message) {
          message = `Error while changing user: ${err.response.data.message}`;
        } else {
          message = `Error while changing user: ${err}`;
        }
        return err.response.data;
      });

    setFlashMessage(message, msgType);
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        <p>Preview Imagem</p>
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          handleOnChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
}
export default Profile;
