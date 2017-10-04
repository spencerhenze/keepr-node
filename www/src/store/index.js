import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'
import axios from 'axios'


var production = !window.location.host.includes('localhost')
// var ip = production ? '//deployment location' : '//localhost:5000'
var ip = '//localhost:3000/'

vue.use(vuex)

let api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000,
    withCredentials: true
})


var store = new vuex.Store({
    state: {
        user: {},
        // vaults: [{ _id: "laiw;o0394u0", title: "cool Vault" }, { _id: "32342kl2;lkj", title: "awesome vault" }],
        vaults: [],
        loggedIn: false,
        results: [
            { title: 'Boise Homes', imgUrl: '//res.cloudinary.com/dvh7zccln/image/upload/v1506560973/SHP_0282_e5rzfg.jpg', description: "Boise is the greatest place on earth to live. Californians have figured that out so we've built a bunch of homes. Check them out!", flex: 12, views: 32, saves: 5 },
            { title: 'Mountain Therapy', imgUrl: '//res.cloudinary.com/dvh7zccln/image/upload/v1501022397/SHP_0604_x1szrl.jpg', description: "Sometimes you just have to escape to the mountains. Check out our hottest recommendations for places to get your zen on.", flex: 6, views: 10, saves: 10 },
            { title: 'Sick Gnar', imgUrl: '//res.cloudinary.com/dvh7zccln/image/upload/v1500221424/SHP_1220_e3cjkd.jpg', description: "Just shred bro. Check out these monster waves on tiny lakes.", flex: 6, views: 100, saves: 45 }
        ],
        loginWindow: false
    },
    mutations: {
        SetLoginWindow(store, value) {
            store.loginWindow = value;
        },
        setLoggedIn(store, value) {
            store.loggedIn = value;
        },
        setUser(store, user) {
            store.user = user;
        },
        setVaults(store, vaults) {
            store.vaults = vaults;
        },
        setResults(store, data) {
            debugger
            // set the flex number for display. Every third one should take up 12. The rest 6
            var flexIndex = 3;
            data.forEach(c => {
                if (flexIndex % 3 == 0) {
                    c.flex = 12;
                }
                else {
                    c.flex = 6;
                }
                flexIndex++;
            })
            store.results = data;
        }

    },
    actions: {
        SetLoginWindow({commit, dispatch}, value) {
            commit("SetLoginWindow", value)
        },
        Register({commit, dispatch}, user) {
            $.post(ip + "register", user)
            .then(res => {
                console.log("user created successfully")
                commit("setLoggedIn", true)
            })
            .catch(err => {
                console.log("your post request to make a new user failed. Here is the error:\n" + err)
            })
        },
        Login({commit, dispatch}, credentials) {
            $.post(ip + 'login', credentials)
            .then(res => {
                commit("setLoggedIn", true)
                commit("setUser", res.data)
                dispatch('GetVaults')
            })
        },
        GetVaults({ commit, dispatch }) {
            api('my-vaults')
                .then(res => {
                    console.log(res.data.data)
                    commit('setVaults', res.data.data)
                })
        },
        GetKeeps({ commit, dispatch }) {
            api('keeps').then(res => {
                commit('setResults', res.data)
            })
        },
        AddKeep({ commit, dispatch }, keep) {
            //make a copy of the keep that doesn't have the vault key on it. The model is not expecting that.
            var purekeep = {
                name: this.keepTitle,
                description: this.keepDescription,
                imgUrl: this.src,
                tags: this.keepTags.split(","),
            }
            // send the model-friendly keep to the default POST route
            api.post('keeps', purekeep)
                .then(res => {
                    debugger
                    console.log(res)
                    if (res.error) {
                        return console.log('something went wrong with your post keep route')
                    }

                    console.log('Keep saved!')
                    console.log(res)
                    // look at this response object and see if you're referencing it right below.
                    // add the id value to the original keep object now that you have it.
                    keep.id = res.data._id
                    // pull the vault key and value off of the original keep object and send it to the save keep route.
                    dispatch('SaveKeep', keep)
                    dispatch("GetKeeps")


                })
        },
        SaveKeep({ commit, dispatch }, keep) {
            api.put('vaults/' + keep.vault + '/keeps/' + keep.id)
                .then(res => {
                    console.log(keep.name + "successfully added to vault: " + keep.vault)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        // CreateAccountExample() {
        //     api.post('account', { email: "j@j.com", password: 'Testing123!' }).then(GetDataExample)
        // },

        // loginAndGetDataExample() {
        //     api.post('account/login', { email: "joe@blow.com", password: 'Password123!' }).then(GetDataExample)
        // },

        // logout() {
        //     api.delete('account/logout')
        // },

        // GetDataExample() {
        //     api('values').then(d => {
        //         console.log("Values Controller Data:", d)
        //     }).catch(err => {
        //         console.error(err)
        //     })
        // },

        // getAuth() {
        //     api('account').then(res => {
        //         console.log("Auth Response", res)
        //     })
        // },
    }
})

export default store;