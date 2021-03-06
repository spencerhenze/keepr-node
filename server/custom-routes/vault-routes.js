let Keeps = require('../models/keep')
let Vaults = require('../models/vault')
let Cloudinary = require('cloudinary');
let User = require('../models/user')
let mongoose = require('mongoose')

module.exports = {

    //these are defined in base-api and user-routes
    SaveKeep: {
        path: '/vaults/:vaultId/keeps/:keepId/save',
        reqType: 'put',
        method(req, res, next) {
            let vaultId = req.params.vaultId;
            let keepId = req.params.keepId;
            let action = 'Add a keep to a vault'
            console.log('this is the keepId')
            console.log(keepId)
            Vaults.findOne({ _id: vaultId })
                .then(vault => {
                    var valid = true;
                    console.log('these are the items being looped over')
                    var i = 1;
                    vault.keeps.forEach(keep => {
                        console.log(i + " " + keep)
                        if (keep == keepId) {
                            console.log("duplicate keep. Process aborted.")
                            valid = false;
                        }
                        i++
                    })
                    if (valid) {
                        console.log("keep is unique")
                        vault.keeps.push(keepId)
                        vault.save()
                        Keeps.findOne({ _id: keepId })
                            .then(keep => {
                                keep.saves++
                                keep.save()
                                res.send({ action, message: "Successfully added keep to vault: " + vault.name })
                            })
                    }
                })
                .catch(error => {
                    // return next(handleResponse(action, null, error))
                    return console.log(error.message)
                })
        }
    },

    FetchVaultkeeps: {
        path: '/vaultkeeps',
        reqType: 'post',
        method(req, res, next) {
            let keepsArr = req.body;
            let action = 'find keeps from vault array'
            Keeps.find({ _id: { $in: keepsArr } })
                .then(keeps => {
                    res.send({ action, keeps })
                })
                .catch(error => {
                    // return next(handleResponse(action, null, error))
                    return console.log(error.message)
                })
        }
    },

    RemoveVaultKeep: {
        path: '/vaults/:vaultId/keeps/:keepId/remove',
        reqType: 'delete',
        method(req, res, next) {
            let vaultId = req.params.vaultId;
            let keepId = req.params.keepId;
            Vaults.findOne({ _id: vaultId })
                .then(vault => {
                    let r = vault.keeps.indexOf(keepId);
                    vault.keeps.splice(r, 1);
                    vault.save()
                        .then((vault) => {
                            console.log("keep: " + keepId + " removed. Here is the updated array")
                            console.log(vault.keeps)
                            res.send({ message: 'keep successfully removed from vault' })
                        })
                })
        }
    }
}