import api from "../../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [pets, setPets] = useState([]);
  const myAppAPI = process.env.REACT_APP_API || "http://localhost:5000";

  useEffect(() => {
    api.get("/pets").then((res) => {
      setPets(res.data.pets);
    });
  }, []);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles.</p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.pet_card}>
              {pet.images[0] === undefined ? (
                <div
                  style={{
                    backgroundImage: `url(${myAppAPI}/images/pets/pets.placeholder)`,
                  }}
                  className={styles.pet_card_image}
                ></div>
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${myAppAPI}/images/pets/${pet.images[0]})`,
                  }}
                  className={styles.pet_card_image}
                ></div>
              )}

              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`pet/${pet._id}`}>Mais Detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Já Adotado</p>
              )}
            </div>
          ))}
        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis para adoção no momento.</p>
        )}
      </div>
    </section>
  );
}
export default Home;
