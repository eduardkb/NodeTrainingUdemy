import styles from "./PetDetails.module.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";

function PetDetails() {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");
  const myAppAPI = process.env.REACT_APP_API || "http://localhost:5000";

  useEffect(() => {
    api
      .get(`/pets/${id}`)
      .then((response) => {
        if (response.data.pet) {
          setPet(response.data.pet);
        } else {
          setPet({ errID: id });
        }
      })
      .catch((err) => {
        setPet({ errID: id });
      });
  }, [id]);

  async function schedule() {
    let msgType = "success";
    console.log("DEB1:", JSON.parse(token));
    const data = await api
      .patch(
        `pets/schedule/${pet._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });
    setFlashMessage(data.message, msgType);
  }

  return (
    <>
      {pet.name ? (
        <section className={styles.pet_details_container}>
          <div className={styles.pet_details_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p> Se tiver interesse, marque uma visita para conhecê-lo.</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                src={`${myAppAPI}/images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}Kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              soliciatar a visita.
            </p>
          )}
        </section>
      ) : (
        <div className={styles.pet_details_header}>
          <p>Pet com ID "{pet.errID}" nao encontrado</p>
        </div>
      )}
    </>
  );
}

export default PetDetails;
