const mongoose = require("mongoose");

const CarVeriosnSpefications = new mongoose.Schema({
  moteur: { type: String, required: true  , enum :["200 d Exclusif +++" , "200 d Exclusif"]},
  annee: { type: Number },
  energie: {
    type: String,
    enum: ["Diesel", "Essence", "Hybride", "Électrique"],
    required: true,
  },
});

const saaChema = new mongoose.Schema({
  carType: {
    type: String,
    required: true,
    enum: [
      "renault",
      "dacia",
      "peugeot",
      "toyota",
      "hyundai",
      "kia",
      "volkswagen",
      "skoda",
      "seat",
      "nissan",
      "citroen",
      "mercedes",
      "suzuki",
      "fiat",
    ],
  },
  //i will only specify mercedeces // Mercedes classe A !!
  model: {
    type: String,
    required: true,
    enum: [
      "mercedes classe a",
      "mercedes classe b",
      "mercedes cla",
      "mercedes gla",
      "mercedes cla shooting brake",
      "mercedes classe c",
      "mercedes classe e",
      "mercedes classe v",
      "mercedes gle",
    ],
  },
  /*
   version : {
    type : String , 
    required : true , 
   // enum : [{"moteur" : "" , "annee" : "" , "energie" : "" } , {"moteur" : "" , "annee" : "" , "energie" : ""} , {"moteur" : "" , "annee" : "" , "energie" : ""}]
    variants : [CarVeriosnSpefications]
} , 
  */
  version: [CarVeriosnSpefications],
  puissanceFiscale: {
    type: String,
    required: true,
    enum: [
      "4cv",
      "5cv",
      "6cv",
      "7cv",
      "8cv",
      "9cv",
      "10cv",
      "11cv",
      "12cv",
      "13cv",
      "14cv",
      "15cv",
      "16cv",
    ],
  },
  numbrePlace: {
    type: Number,
    required: true,
    enum: [2, 3, 4, 5, 6, 7],
  },
  numéroDimmatriculation: {
    type: Number,
    required: true,
    unique: true,
  },
  valeurVénale: {
    type: Number,
    required: true,
  },
  driver: {
    // the deriver which he is the user will specify their kind of car and the car will be linked to the user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});



const Car = mongoose.model("Car", saaChema);
module.exports = Car;
