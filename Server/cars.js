const mongoose = require('mongoose');
const schema = mongoose.Schema;
const carschema = new schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  engines: {
    type: [String],
    required: true,
  },
  gearboxes: {
    type: [String],
    required: true,
  },
  completeSet: {
    type: [String],
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
  photo: {
    type: String,
  },
});
carschema.methods.setPhoto = function (photo) {
  this.photo = photo;
  return this.save();
};
carschema.methods.getEngines = function () {
  return this.engines || [];
};
carschema.methods.addEngine = function (newEngine) {
  if (!this.engines.includes(newEngine)) {
    this.engines.push(newEngine);
    return this.save();
  }
  return Promise.resolve(this);
};

carschema.methods.dellEngine = function (engineToRemove) {
  if (this.engines.length <= 1) {
    return Promise.reject(new Error('Cannot delete the only engine.'));
  }
  if (this.engines.includes(engineToRemove)) {
    this.engines = this.engines.filter((engine) => engine !== engineToRemove);
    return this.save();
  }
  return Promise.resolve(this);
};

carschema.methods.addBox = function (newBox) {
  if (!this.gearboxes.includes(newBox)) {
    this.gearboxes.push(newBox);
    return this.save();
  }
  return Promise.resolve(this);
};

carschema.methods.dellBox = function (boxToRemove) {
  if (this.gearboxes.length <= 1) {
    return Promise.reject(new Error('Cannot delete the only box.'));
  }
  if (!this.gearboxes.includes(boxToRemove)) {
    return Promise.reject(new Error('Box not found.'));
  }
  this.gearboxes = this.gearboxes.filter((box) => box !== boxToRemove);
  return this.save();
};
carschema.methods.addColor = function (newColor) {
  if (!this.color.includes(newColor)) {
    this.color.push(newColor);
    return this.save();
  }
  return Promise.resolve(this);
};
carschema.methods.dellColor = function (colorToRemove) {
  if (this.color.length <= 1) {
    return Promise.reject(new Error('Cannot delete the only color.'));
  }
  if (!this.color.includes(colorToRemove)) {
    return Promise.reject(new Error('Color not found.'));
  }
  this.color = this.color.filter((colors) => colors !== colorToRemove);
  return this.save();
};
carschema.methods.addComp = function (newComp) {
  if (!this.completeSet.includes(newComp)) {
    this.completeSet.push(newComp);
    return this.save();
  }
  return Promise.resolve(this);
};
carschema.methods.dellComp = function (compToRemove) {
  if (this.completeSet.length <= 1) {
    return Promise.reject(new Error('Cannot delete the only comp.'));
  }
  if (!this.completeSet.includes(compToRemove)) {
    return Promise.reject(new Error('Color not found.'));
  }
  this.completeSet = this.completeSet.filter((comp) => comp !== compToRemove);
  return this.save();
};
const Car = mongoose.model('car', carschema);
module.exports = Car;
