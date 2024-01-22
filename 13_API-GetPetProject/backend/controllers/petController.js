const Pet = require("../models/Pet");

// helpers
const getToken = require("../helper/get-token");
const getUserByToken = require("../helper/get-user-by-token");
const writeLog = require("../helper/write-log");

module.exports = class PetController {
  static getTestReq(req, res) {
    return res.status(200).json({
      message: "Success getting pets",
      obs: "Demo hardocded data returned.",
      status: 200,
      pets: [
        { name: "Polly", breed: "Shih Tzu", age: 2 },
        { name: "Luna", breed: "Spitz Alemao", age: 8 },
      ],
    });
  }
  static async create(req, res) {
    const { name, age, weight, breed, color } = req.body;
    const available = true;

    // image upload
    // !!! PLACEHOLDER !!!

    // validations
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório." });
    }
    if (!age) {
      return res.status(422).json({ message: "A idade é obrigatória." });
    }
    if (!weight) {
      return res.status(422).json({ message: "O peso é obrigatório." });
    }
    if (!breed) {
      return res.status(422).json({ message: "A raça é obrigatória." });
    }
    if (!color) {
      return res.status(422).json({ message: "A cor é obrigatória." });
    }

    // Get Pet Owner
    const token = getToken(req);
    const owner = await getUserByToken(token);

    // Create a Pet object
    const pet = new Pet({
      name,
      age,
      weight,
      breed,
      color,
      available,
      images: [],
      user: {
        _id: owner._id,
        name: owner.name,
        image: owner.image,
        phone: owner.phone,
      },
    });

    try {
      const newPet = await pet.save();
      writeLog("INF", "DbSave", `Pet saved successfully: ${newPet}`);
      return res
        .status(201)
        .json({ message: "Pet cadastrado com sucesso.", newPet });
    } catch (error) {
      writeLog("DEB", "DbSave", `Error while sving pet. Err: ${error}`);
      return res
        .status(500)
        .json({ message: "Erro ao salvar o pet. Tente novamente mais tarde." });
    }
  }
};
