import { useState, useContext } from "react";
import Input from "../../form/input";
import styles from "../../form/form.module.css";
import { Link } from "react-router-dom";

// Import context
import { UserContext } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(UserContext);
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-Mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Não tem Conta?
        <Link to="/register"> Clique aqui.</Link>
      </p>
    </section>
  );
}
export default Login;
