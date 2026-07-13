const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Removes accidental whitespace
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    default: 1, // Start at 1 for a new user
  },
  lastVisited: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "superAdmin"],
  },
  profession: {
    type: String,
    required: true,
    enum: [
      "(Médecine) Spécialiste",
      "(Médecine) Professeur",
      "Acheteur",
      "Administrateur",
      "Affairiste",
      "Agent Administratif",
      "Agent Commercial",
      "Agent d'Entretien Espace Vert",
      "Agent d'Entretien et Nettoyage",
      "Agent de Bureau",
      "Agent de Cantine",
      "Agent de Recouvrement",
      "Agent de Reprographie",
      "Agent de Transit",
      "Agent Formation Plaques",
      "Agent Immobilier",
      "Agent Sécurité & Surveillance",
      "Aide Conducteur Engins",
    ],
  },
  wilaya: {
    type: String, 
    required: true, 
    enum : [
      "Adrar",
      "Chlef",    
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa", 
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa", ]
  },
  // i skipped the region because its too much work and i aint getting no money so 
 adress : {
  type :String ,
  required : true ,
 } , 
 NumTel : {
  type :Number , 
  required : true ,
 }
});

module.exports = mongoose.model("User", userSchema);
