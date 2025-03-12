const mongoose = require("mongoose");


const DistrictSchema = new mongoose.Schema({
  state: String,
  districts: [
    {
      english: String,
      telugu: String,
    },
  ],
});


// module.exports = mongoose.models.District || mongoose.model("District", DistrictSchema);

module.exports = mongoose.model("states_districts", DistrictSchema);