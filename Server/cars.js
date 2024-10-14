const mongoose = require("mongoose");
const schema = mongoose.Schema;
const carschema = new schema({
	name: String,
	category: String,
	engines: [String],
	gearboxes: [String],
	completeSet: [String]
});
const Car = mongoose.model("car", carschema)
module.exports=Car;