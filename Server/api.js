const express = require("express");
const router = express.Router();
const Car = require("./cars")
router.get("/cars", (req, res)=>{
	Car.find({}).then(car=>{
		res.send(car)
	})
})
router.post("/cars", (req, res)=>{
	Car.create(req.body).then(car =>{
		res.send(car);
	});
});
router.put("/cars/:id", (req, res)=>{
	Car.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
		Car.find({_id: req.params.id}).then(car=>{
			res.send(car);
		})
	})
})
router.delete("/cars/:id", (req, res)=>{
	Car.deleteOne({_id: req.params.id}).then(car=>{
		res.send(car);
	})
})
module.exports = router;