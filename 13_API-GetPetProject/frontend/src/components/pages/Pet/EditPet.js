import api from "../../../utils/api";
import { useState, useEffect } from "react";
import styles from "./AddPet.module.css";
import PetForm from "../../form/PetForm";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { useParams } from "react-router-dom";

function EditPet() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        if (response.data.pet) {
          setPet(response.data.pet);
        } else {
          setPet({});
        }
      })
      .catch((err) => {
        setPet({ errID: id });
      });
  }, [token, id]);

  async function updatePet(pet) {
    let msgType = "success";
    const formData = new FormData();
    await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });
    const data = await api
      .patch(`pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });
    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      {pet.name ? (
        <>
          <div className={styles.addpet_header}>
            <h1>Editando o Pet: {pet.name}</h1>
            <p>Atualizar dados</p>
          </div>
          <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />
        </>
      ) : (
        <>
          <div className={styles.addpet_header}>
            <p>Pet com id "{pet.errID}" nao Encontrado</p>
          </div>
        </>
      )}
    </section>
  );
}
export default EditPet;
