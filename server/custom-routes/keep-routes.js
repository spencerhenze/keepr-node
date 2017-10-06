let Keeps = require('../models/keep')
let Cloudinary = require('cloudinary');
let User = require('../models/user')
let mongoose = require('mongoose')

//Uploading a keep
//1. add the keep with the default route
//2. hit the save keep route to add the keep to the vault's list of keeps

module.exports = {
    // searchByTag: {
    //     // This may or may not work. Needs testing
    //     path: '/keeps/search/tags',
    //     reqType: 'get',
    //     method(req, res, next) {
    //         let action = 'Find keep by tag'
    //         let names = req.query.tags.split(',');
    //         let limit = Math.min(50, req.query.limit || 20);
    //         let offset = parseInt(req.query.offset) || 0;
    //         Keeps.find({ tags: { $all: names } }).limit(limit).skip(offset)
    //             .then(keeps => {
    //                 res.send(handleResponse(action, keeps))
    //             })
    //             .catch(error => {
    //                 return next(handleResponse(action, null, error))
    //             })
    //     }
    // },
    getUserKeeps: {
        path: '/my-keeps',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get all keeps the user has created'
            Keeps.find({ creatorId: req.session.uid })
                .then(keeps => {
                    res.send(keeps)
                })
                .catch(err => {
                    console.log(err.message)
                    return next(handleResponse(action, null, error))
                })
        }
    },

    view: {
        path: '/keeps/:keepId/view',
        reqType: 'put',
        method(req, res, next) {
            let action = 'View keep';
            Keeps.findById(req.params.keepId)
                .then(keep => {
                    if (updateKeepViews(keep, req.session.uid)) {
                        keep.views.push(req.session.uid)
                        keep.save()
                            .then(() => {
                                res.send(handleResponse(action, keep))
                            })
                            .catch(error => {
                                return next(handleResponse(action, null, error))
                            })
                    }
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    }
}

function updateKeepViews(keep, userId) {
    let index = keep.views.indexOf(userId);
    let viewed;
    if (index == -1) {
        viewed = true
    } else {
        viewed = false
    }
    return viewed;
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