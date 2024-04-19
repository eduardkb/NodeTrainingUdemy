import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import RoundedImage from "../../layout/RoundedImage";
import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from "./Dashboard.module.css";

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const myAppAPI = process.env.REACT_APP_API || "http://localhost:5000";

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((err) => {
        console.log(console.log(`Bearer ${JSON.parse(token)}`));
        console.log(`Err: ${err}`);
      });
  }, [token]);

  async function removePet(id) {
    let msgType = "success";
    let message = "";

    await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        message = response.data.message;
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        if (err.response.data.message) {
          message = err.response.data.message;
        } else {
          message = `Erro ao adicionar pet: ${err}`;
        }
        return err.response.data;
      });

    setFlashMessage(message, msgType);
  }
  async function concludeAdoption(id) {
    let msgType = "success";
    const data = await api
      .patch(
        `/pets/conclude/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
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
      <div className={styles.petslist_header}>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              {pet.images[0] === undefined ? (
                <RoundedImage
                  src={`${myAppAPI}/images/pets/pets.placeholder`}
                  alt={pet.name}
                  width="px75"
                />
              ) : (
                <RoundedImage
                  src={`${myAppAPI}/images/pets/${pet.images[0]}`}
                  alt={pet.name}
                  width="px75"
                />
              )}

              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        onClick={() => {
                          concludeAdoption(pet._id);
                        }}
                        className={styles.conclude_btn}
                      >
                        Concluir Adoçao
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id);
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Não há pets cadastrados.</p>}
      </div>
    </section>
  );
}
export default MyPets;
