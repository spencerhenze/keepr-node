// This is copied. Edit it for vault
var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created: { type: String, default: new Date() },
  keeps: { type: [ObjectId], ref: models.keep.name, default: [], dropDups: true },
  creatorId: { type: ObjectId, ref: models.user.name, required: true },

});

module.exports = mongoose.model(models.vault.name, schema);