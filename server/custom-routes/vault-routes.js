let Keeps = require('../models/keep')
let Vaults = require('../models/vault')
let Cloudinary = require('cloudinary');
let User = require('../models/user')
let mongoose = require('mongoose')

module.exports = {
    //these are defined in base-api and user-routes
    SaveKeep: {
        // This may or may not work. Needs testing
        path: '/vaults/:vaultId/keeps/:keepId/save',
        reqType: 'put',
        method(req, res, next) {
            let vaultId = req.params.vaultId;
            let keepId = req.params.keepId;
            let action = 'Add a keep to a vault'
            Vaults.findOne({ _id: vaultId })
                .then(vault => {
                    vault.keeps.push(keepId)
                    vault.save()
                    res.send({action, message:"Successfully added keep to vault: " + vault.name })
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },

}