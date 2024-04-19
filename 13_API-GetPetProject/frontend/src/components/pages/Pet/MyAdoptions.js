import api from "../../../utils/api";
import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import RoundedImage from "../../layout/RoundedImage";

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [apiErr, setApiErr] = useState(false);
  const [token] = useState(localStorage.getItem("token") || "");
  const myAppAPI = process.env.REACT_APP_API || "http://localhost:5000";

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        setApiErr(false);
        setPets(res.data.pets);
      })
      .catch((err) => {
        setApiErr(true);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas Adoções</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 ? (
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
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {pet.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {pet.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em Processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <>
            {apiErr ? (
              <>
                <p>Erro ao recuperar minhas adoçoes</p>
                <p>Faça login novamente</p>
              </>
            ) : (
              <p>Ainda nao há adoçoes de pets</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
export default MyAdoptions;
