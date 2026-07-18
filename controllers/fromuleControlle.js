// here i have to fill the user's formule [DELETE / POST / UPDATE / GET / PUT] ]
const User = require("../model/user");
const saa = require("../model/saa");
const pack = require("../model/pack");
const coonectedDatabase = require("../connection/connection");
const car = require("../model/newCarModel");

//saaFake/offer/auto

const createFormula = async (req, res) => {
  const {
    carType,
    model,
    version,
    puissanceFiscale,
    numbrePlace,
    numéroDimmatriculation,
    valeurVénale,
    driver,
  } = req.body;
  if (!req.user) {
    return res
      .status(401)
      .json({ msg: "Authentication required: req.user is undefined" });
  }

  try {
    await coonectedDatabase();
    const ForlulaData = {
      carType,
      model,
      version,
      puissanceFiscale,
      numbrePlace,
      numéroDimmatriculation,
      valeurVénale,
      driver: req.user.id,
      userId: req.user.id,
    };
    const createFormule = await saa.create(ForlulaData);

    /* const createFormule = await saa.create({
      carType,
      model,
      version,
      puissanceFiscale,
      numbrePlace,
      numéroDimmatriculation,
      valeurVénale,
      driver,
    });
    */
    //How tf  are u sending a undefined token withiut define it rude  like ur telling the compiler that hey look at that person and u were just mocking it !!
    if (!createFormule) {
      console.log("error");
    }

    res.status(201).json({
      msg: "ur formula has been created ",
      data: createFormule,
      //token: token
    });
  } catch (error) {
    console.error("DEBUG - Mongoose Validation Error:", error); // <-- THIS IS THE KEY
    res.status(500).json({
      msg: "Server error",
      error: error.message,
      stack: error.stack,
    });
  }
};
const createNewCarFormulaireSchema = async (req, res) => {
  const {
    companyName,
    carName,
    engine,
    fuelType,
    seats,
    batteryCapacity,
    horsePower,
    totalSpeed,
    performance,
    torque,
    carsPrice,
  } = req.body;
  if (!req.user) {
    return res.status(401).json({ msg: "not authorized" });
  }
  try {
    await coonectedDatabase();
    const formulareNewShema = {
      companyName,
      carName,
      engine,
      fuelType,
      seats,
      batteryCapacity,
      horsePower,
      totalSpeed,
      performance,
      torque,
      carsPrice,
      driver: req.user.id,
    };
    const createFormulaireNewShema = await car.create(formulareNewShema);

    res.status(200).json({
      msg: "created so good",
      data: createFormulaireNewShema,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};
const getAllUsersFormulas = async (req, res) => {
  res.send("working on it lol just wait u patientless ahh");
};
const deleteFormulaById = async (req, res) => {
  res.send("working on it lol just wait u patientless ahh");
};
const updateFormulaById = async (req, res) => {
  res.send("working on it lol just wait u patientless ahh");
};
const getFormulaById = async (req, res) => {
  res.send("working on it lol just wait u patientless ahh");
};

module.exports = {
  createFormula,
  getAllUsersFormulas,
  deleteFormulaById,
  updateFormulaById,
  getFormulaById,
  createNewCarFormulaireSchema,
};
///THIS IS JUST A SIMULATION FOR LEARNING PURPOSES , I WILL NOT USE IT IN THE FINAL PROJECT
