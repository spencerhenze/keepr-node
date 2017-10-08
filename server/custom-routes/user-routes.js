let Vaults = require('../models/vault')
let Keeps = require('../models/keep')
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
    deleteUserKeeps: {
        path: '/removekeeps',
        reqType: 'delete',
        method(req, res, next) {
            let action = 'find keeps from vault array'
            Keeps.remove({ creatorId: req.session.uid }).exec()
                .then(res => {
                    Keeps.save()
                    res.send({ action, res })
                })
                .catch(error => {
                    // return next(handleResponse(action, null, error))
                    return console.log(error.message)
                })
        }

    },

    deleteUserVaults: {
        path: '/removevaults',
        reqType: 'delete',
        method(req, res, next) {
            let action = 'find keeps from vault array'
            Vaults.remove({ creatorId: req.session.uid }).exec()
                .then(res => {
                    Keeps.save()
                    res.send({ action, res })
                })
                .catch(error => {
                    // return next(handleResponse(action, null, error))
                    return console.log(error.message)
                })
        }

    },

    //This route adds the attributes needed for chips
    addCreatorInfoToKeeps: {
        path: '/addcreatorinfo',
        reqType: 'get',
        method(req, res, next) {
            let action = 'add creator image and name to keep objects'
            var stream = Keeps.find().stream();

            stream.on('data', function (keep) {
                User.findById({ _id: keep.creatorId })
                    .then(user => {
                        console.log(user)
                        keep.creatorPhoto = user.profileImg;
                        keep.creatorName = user.name;
                        keep.save();
                    })
            })
                .on('error', function (err) {
                    console.log(err.message)
                })
                .on('close', function () {
                    console.log('keeps updated successfully.')
                    res.send({ message: 'keeps updated successfully' })
                })



        }
    },

    getBasicUserInfo: {
        path: "/users/:userId/basic",
        reqType: 'get',
        method(req, res, next) {
            let userId = req.params.userId
            User.findById({ _id: userId })
                .then(user => {
                    var cleanUser = {
                        name: user.name,
                        profileImg: user.profileImg,
                    }

                    res.send(cleanUser)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

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