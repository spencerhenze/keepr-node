let Keeps = require('../models/keep')
let Cloudinary = require('cloudinary');
let User = require('../models/user')
let mongoose = require('mongoose')

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
    },
    // upload: {
    //     path: '/keep/upload',
    //     reqType: 'post',
    //     method(req, res, next) {
    //         let action = 'Upload keep';
    //         let keep = {}


    //         Keeps.create(req.body)
    //             .then(keep => {
    //                 res.send(handleResponse(action, keep))
    //             })
    //             .catch(error => {
    //                 return next(handleResponse(action, null, error))
    //             })
    //     // })
    // }
},
    updateTag: {
    path: '/tattoos/:tattooId/update',
        reqType: 'put',
            method(req, res, next) {
        let action = 'Build array of tag ids and update tattoo';

        Tattoos.findById(req.params.tattooId)
            .then(tattoo => {
                tattoo.tags.push(req.body.tag)
                tattoo.save()
                    .then(() => {
                        res.send(handleResponse(action, tattoo))
                    })
                    .catch(error => {
                        return next(handleResponse(action, null, error))
                    })
            })
            .catch(error => {
                next(handleResponse(action, null, error))
            })
    }
},
purchaseTattoo: {
    /* 
    front end will submit the id to purchase over the URL. Then it will wait for the server response. If the
        server responds with object that has a 'success' key, charge the user. if server responds with
        an object with an 'alert' key, don't charge the user.
    */
    path: '/tattoos/:tattooId/purchase',
        reqType: 'put',
            method(req, res, next) {
        let action = 'Add tattoo to the user purchased array'
        let tattooId = req.params.tattooId
        User.findById(req.session.uid)
            .then(user => {
                let objId = mongoose.Types.ObjectId(tattooId);
                if (!user.purchased.includes(mongoose.Types.ObjectId(tattooId))) {
                    // TODO: Add stripe card charge and verification
                    // Set your secret key: remember to change this to your live secret key in production
                    // See your keys here: https://dashboard.stripe.com/account/apikeys

                    // Token is created using Stripe.js or Checkout!
                    // Get the payment token ID submitted by the form:
                    var token = req.body.stripeToken.id; // Using Express

                    // Charge the user's card:
                    Tattoos.findById(tattooId).select('hdUrl price').exec()
                        .then(tattoo => {
                            // send hdUrl to user in an email.
                            stripe.charges.create({
                                amount: tattoo.price * 100,
                                currency: "usd",
                                description: "Example charge",
                                source: token,
                            }, function (err, charge) {
                                if (err) {
                                    return next(handleResponse(action, null, err))
                                }
                                console.log(charge)
                                // asynchronously called
                                user.purchased.push(tattooId)
                                user.save()
                                    .then(() => {
                                        res.send(handleResponse(action, { success: 'successfully purchased tattoo' }))
                                        var account = {
                                            email: user.email,
                                            hdUrl: tattoo.hdUrl
                                        }
                                        Mailer.createMailer(account)
                                    })
                                    .catch(error => {
                                        return next(handleResponse(action, null, error))
                                    })
                            })
                        })
                        .catch(error => {
                            return next(handleResponse(action, null, error))
                        })

                } else {
                    res.send(handleResponse(action, { alert: 'user already owns this item' }))
                }
            }).catch(error => {
                return next(handleResponse(action, null, error))
            })
    }
},
getWeeklyTopArtists: {
    path: '/artists/top-weekly',
        reqType: 'get',
            method(req, res, next) {
        let action = 'Find artists with most likes on their designs in the past week'
        let limit = Math.min(req.query.limit || 10, 50);
        User.find({ accountType: 'artist' })
            .then(users => {
                let artists = []
                users.forEach(artist => {
                    for (let i = 0; i < artist.weeklyLikes.length; i++) {
                        if (Date.now() - artist.weeklyLikes[i] > (1000 * 60 * 60 * 24 * 7)) {
                            artist.weeklyLikes.splice(i, 1)
                            i--;
                        }
                    }
                    artists.push({ _id: artist._id, numWeeklyLikes: artist.weeklyLikes.length, name: artist.name })
                    // artist.numWeeklyLikes = artist.weeklyLikes.length;
                });
                artists.sort((a, b) => {
                    return b.numWeeklyLikes - a.numWeeklyLikes;
                })
                res.send(handleResponse(action, artists.slice(0, limit)))
                // artists.save() // array of documents don't have a save function
                //     .then(() => {
                //         User.find({ accountType: 'artist' }).limit(limit).sort('-numWeeklyLikes')
                //             .then(users => {
                //                 res.send(handleResponse(action, users))
                //             })
                //             .catch(error => {
                //                 return next(handleResponse(action, null, error))
                //             })
                //     })
                //     .catch(error => {
                //         return next(handleResponse(action, null, error))
                //     })
            })
            .catch(error => {
                return next(handleResponse(action, null, error))
            })
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