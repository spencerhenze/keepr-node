// copied. Make sure to edit this for a keep

var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
    description: { type: String },
    imgUrl: { type: String, default: '//res.cloudinary.com/keepr/image/upload/v1507065886/placeholder_uanfhh.jpg'},
    tags: { type: [String], default: [] },
    private: { type: Boolean, required: true},
    created: { type: Number, default: Date.now() },
    saves: { type: Number, default: 0 },
    views: { type: [ObjectId], ref:models.user.name, default: [] },
	// Relationships
    // vaultId: { type: ObjectId, ref: models.vault, required: true },
    creatorId: {type: ObjectId, ref: models.user.name, required: true},
});

module.exports = mongoose.model(models.keep.name, schema);