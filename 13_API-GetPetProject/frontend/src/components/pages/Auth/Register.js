import Input from "../../form/input";
import styles from "../../form/form.module.css";
import { Link } from "react-router-dom";

function Register() {
  function handleChange(e) {}

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="text"
          name="email"
          placeholder="Digite seu E-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite seu telefone"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique Aqui.</Link>
      </p>
    </section>
  );
}
export default Register;
