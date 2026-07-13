const mongoose = require("mongoose");

const packSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "PACK ECO",
      "PACK CLASSIC",
      "PACK ESSENTIEL",
      "PACK ESSENTIEL +",
      "PACK PREMIUM",
      "PACK SILVER",
      "PACK GOLD",
    ],
  },
  features: {
    responsabiliteCivile: { type: Boolean, default: true },
    assistance: { type: Boolean, default: true },
    brisDeGlace: {
      type: String,
      enum: ["none", "standard", "panoramique"],
      default: "standard",
    },
    volEtIncendie: { type: Boolean, default: false },
    rachatVetuste: { type: Boolean, default: false },
    topReparateur: { type: Boolean, default: false },
  },
  basePrice: { type: Number, required: true },
  discountRate: { type: Number, default: 0 }, // e.g., 0.40 for 40%
  isRecommended: { type: Boolean, default: false }
});

module.exports = mongoose.model("Pack", packSchema);    
