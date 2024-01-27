const Pet = require("../models/Pet");

// helpers
const getToken = require("../helper/get-token");
const getUserByToken = require("../helper/get-user-by-token");
const writeLog = require("../helper/write-log");
const ObjectID = require("mongoose").Types.ObjectId;

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
    const images = req.files;

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

    // image upload
    if (images.length === 0) {
      return res
        .status(422)
        .json({ message: "Upload de imagem do pet é obrigatório." });
    }

    // Get Pet Owner
    const token = getToken(req);
    const owner = await getUserByToken(token, res);

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

    // get image fileName from POST and insert into new pet.images array
    images.map((image) => {
      pet.images.push(image.filename);
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
  static async getAll(req, res) {
    try {
      const pets = await Pet.find().sort("-createdAt");
      return res.status(200).json({ pets: pets });
    } catch (error) {
      writeLog(
        "DEB",
        "DbErr",
        `Error while retreiving all pets. ERR: ${error}`
      );
      return res.status(500).json({
        message: "Erro ao consultar os Pets. Tente novamente mais tarde.",
      });
    }
  }
  static async getUserPets(req, res) {
    try {
      // get user from token
      const token = getToken(req);
      const user = await getUserByToken(token);

      const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");
      return res.status(200).json({ pets: pets });
    } catch (error) {
      writeLog(
        "DEB",
        "DbErr",
        `Error while retreiving user pets. ERR: ${error}`
      );
      return res.status(500).json({
        message: "Erro ao consultar os seus Pets. Tente novamente mais tarde.",
      });
    }
  }
  static async getAllUserAdoptions(req, res) {
    try {
      // get user from token
      const token = getToken(req);
      const user = await getUserByToken(token);

      const pets = await Pet.find({ "adopter._id": user._id }).sort(
        "-createdAt"
      );
      return res.status(200).json({ pets: pets });
    } catch (error) {
      writeLog(
        "DEB",
        "DbErr",
        `Error while retreiving adopted pets. ERR: ${error}`
      );
      return res.status(500).json({
        message: "Erro ao consultar pets adotados. Tente novamente mais tarde.",
      });
    }
  }
  static async getPedById(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectID.isValid(id)) {
        return res.status(422).json({ message: "ID Inválida." });
      }

      // get pet by ID
      const pet = await Pet.findOne({ _id: id });

      // check if pet exists
      if (!pet) {
        return res.status(404).json({ message: "O pet nao foi encontrado." });
      }

      // retornar pet
      return res.status(200).json({ pet: pet });
    } catch (error) {
      writeLog(
        "DEB",
        "DbErr",
        `Error while retreiving pet details. ERR: ${error}`
      );
      return res.status(500).json({
        message: "Erro ao consultar o pet. Tente novamente mais tarde.",
      });
    }
  }
  static async removePetById(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectID.isValid(id)) {
        return res.status(422).json({ message: "ID Inválida." });
      }

      // get pet by ID
      const pet = await Pet.findOne({ _id: id });

      // check if pet exists
      if (!pet) {
        return res.status(404).json({ message: "O pet nao foi encontrado." });
      }

      // check if logged in user registered the pet to delete
      const token = getToken(req);
      const user = await getUserByToken(token);

      if (pet.user._id.toString() !== user._id.toString()) {
        return res
          .status(404)
          .json({ message: "Voce nao pode deletar este pet." });
      }

      // delete user
      await Pet.findByIdAndDelete(id);
      return res.status(200).json({ message: "Pet removido com sucesso." });
    } catch (error) {
      writeLog("DEB", "DbErr", `Error while removing pet. ERR: ${error}`);
      return res.status(500).json({
        message: "Erro ao remover o pet. Tente novamente mais tarde.",
      });
    }
  }
};
