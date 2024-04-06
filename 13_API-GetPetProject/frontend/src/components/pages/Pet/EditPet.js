import api from "../../../utils/api";
import { useState, useEffect } from "react";
import styles from "./AddPet.module.css";
import PetForm from "../../form/PetForm";
import useFlashMessage from "../../../hooks/useFlashMessage";

function EditPet() {
  return (
    <section>
      <div className={styles.addpet_header}></div>
      <h1>Editando o Pet: pet.name</h1>
      <p>Atualizar dados</p>
    </section>
  );
}
export default EditPet;
