import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import formStyles from "../../form/form.module.css";
import Input from "../../form/input";

function Profile() {
  const [user, setUser] = useState({});

  function onFileChange(e) {
    return 1;
  }
  function handleChange(e) {
    return 1;
  }
  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        <p>Preview Imagem</p>
      </div>
      <form className={formStyles.form_container}>
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
          value={user.nome || ""}
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
