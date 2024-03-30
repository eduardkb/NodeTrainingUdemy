import { useState } from "react";
import formStyles from "./form.module.css";
import Input from "./input";
import Select from "./Select";

function PetForm({ handleSubmit, petData, btnText }) {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];
  const myAppAPI = process.env.REACT_APP_API || "http://localhost:5000";

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  }
  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }
  function handleColor(e) {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  }
  function submit(e) {
    e.preventDefault();
    console.log(pet);
    handleSubmit(pet);
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${myAppAPI}/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))}
      </div>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome do pet"
        value={pet.name || ""}
        handleOnChange={handleChange}
      />
      <Input
        text="Idade do Pet"
        type="text"
        name="age"
        placeholder="Digite a idade do pet"
        value={pet.age || ""}
        handleOnChange={handleChange}
      />
      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso do pet"
        value={pet.weight || ""}
        handleOnChange={handleChange}
      />
      <Input
        text="Raça do Pet"
        type="text"
        name="breed"
        placeholder="Digite a raça do pet"
        value={pet.breed || ""}
        handleOnChange={handleChange}
      />
      <Select
        name="color"
        text="Selectione a cor"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}
export default PetForm;
