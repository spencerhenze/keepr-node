let Keeps = require('../models/keep')
let Cloudinary = require('cloudinary');
let User = require('../models/user')
let mongoose = require('mongoose')

//Uploading a keep
//1. add the keep with the default route
//2. hit the save keep route to add the keep to the vault's list of keeps

module.exports = {
    searchByTag: {
        // This may or may not work. Needs testing
        path: '/keeps/search/tags',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find keep by tag'
            let names = req.query.tags.split(',');
            let limit = Math.min(50, req.query.limit || 20);
            let offset = parseInt(req.query.offset) || 0;
            Keeps.find({ tags: { $all: names } }).limit(limit).skip(offset)
                .then(keeps => {
                    res.send(handleResponse(action, keeps))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    like: {
        path: '/keeps/:keepId/like',
        reqType: 'put',
        method(req, res, next) {
            // let action = 'Like tattoo';
            // Tattoos.findById(req.params.tattooId)//.select('likes').exec()
            //     .then(tattoo => {
            //         if (updateTattooLikes(tattoo, req.session.uid)) {
            //             User.findById(tattoo.creatorId)
            //                 .then(user => {
            //                     user.weeklyLikes.push(Date.now())
            //                     user.save()
            //                         .then(() => {
            //                             console.log('updated weekly likes')
            //                         })
            //                 })
            //         }
            //         tattoo.save()
            //             .then(() => {
            //                 // tattoo.likes = []
            //                 res.send(handleResponse(action, tattoo))
            //             })
            //             .catch(error => {
            //                 return next(handleResponse(action, null, error))
            //             })

            //     })
            //     .catch(error => {
            //         return next(handleResponse(action, null, error))
            //     })
        }
    }
}

function updateTattooLikes(tattoo, userId) {
    let index = tattoo.likes.indexOf(userId);
    let liked;
    if (index == -1) {
        tattoo.likes.push(userId);
        liked = true
    } else {
        tattoo.likes.splice(index, 1);
        liked = false
    }
    tattoo.numLikes = tattoo.likes.length;
    return liked;
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