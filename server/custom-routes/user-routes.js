let Vaults = require('../models/vault')
let User = require('../models/user')
let mongoose = require('mongoose')

module.exports = {
    getUserVaults: {
        path: '/my-vaults',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get vaults that the user has created'
            // query the vaults collection to find all keeps with a creatorId that matches the uid on the session
            Vaults.find({ creatorId: req.session.uid }).then(vaults => {
                res.send(handleResponse(action, vaults))
            })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getUserKeeps: {
        path: '/mykeeps',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get keeps that the user has uploaded'
            // find the user object by the id on the request session
            Keeps.find({ creatorId: req.session.uid }).sort('-created').then(keeps => {
                res.send(handleResponse(action, keeps))
            })
                .catch(error => {
                    console.log("something went wrong")
                    return next(handleResponse(action, null, error))
                })
        }
    },
}

function handleResponse(action, data, error) {
    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}