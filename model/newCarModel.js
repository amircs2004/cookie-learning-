const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  // Highly variable fields: Removed enum for scalability
companyName: { 
    type: String, 
    required: true, 
    // This list ensures your frontend dropdown only displays these specific options
    enum: [
      'Acura', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Cadillac', 
      'Chevrolet', 'Ferrari', 'Ford', 'GMC', 'Honda', 'Hyundai', 'Jaguar Land Rover', 
      'Jeep', 'Kia', 'Lamborghini', 'Mahindra', 'Maruti Suzuki', 'Mazda', 
      'Mercedes', 'Mitsubishi', 'Nissan', 'Peugeot', 'Porsche', 'Rolls Royce', 
      'Tata Motors', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
    ] 
  },  carName: { type: String, required: true },
  engine: { type: String },
  
  // Fields with a reasonable, limited set of values: Enum is appropriate
  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid", "Electric/Gas"], // Add others from your dataset
    required: true,
  },
  
  // Cleaned up Seats field (standardized as a Number)
  seats: { 
    type: Number, 
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 20] 
  },

  // Numerical/Metric fields for better data handling
  batteryCapacity: { type: String }, // e.g., "3,900cc"
  horsePower: { type: String },      // e.g., "710 hp"
  totalSpeed: { type: String },      // e.g., "340 km/h"
  performance: { type: String },     // e.g., "2.9s"
  torque: { type: String },          // e.g., "770 Nm"
  
  // Financial field (keep as Number for easy calculations)
  carsPrice: { type: Number, required: true },

  // Linked to your user
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);
module.exports = Car;