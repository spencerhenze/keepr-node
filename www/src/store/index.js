import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'
import axios from 'axios'
import router from '../router'


var production = !window.location.host.includes('localhost')
// var ip = production ? '//deployment location' : '//localhost:5000'
var baseUrl = production ? '/deploymentaddress/' : '//localhost:3000/';

vue.use(vuex)

let api = axios.create({
    baseURL: baseUrl + 'api/',
    timeout: 10000,
    withCredentials: true
})

let auth = axios.create({
    baseURL: baseUrl,
    timeout: 40000,
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
        loginWindow: false,
        loginError: false,
        error: {}
    },
    mutations: {
        setDefaultState(store) {
            //clear everything (called on logout)
        },
        SetLoginWindow(store, value) {
            store.loginWindow = value;
        },
        setLoggedIn(store, value) {
            store.loggedIn = value;
        },
        SetLoginError(store, value) {
            store.loginError = value;
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
        },
        handleError(state, err) {
            state.error = err
        }

    },
    actions: {
        SetLoginWindow({ commit, dispatch }, value) {
            commit("SetLoginWindow", value)
        },
        ResetLoginError({ commit, dispatch }) {
            commit("SetLoginError", false)
        },

        Register({ commit, dispatch }, user) {
            auth.post("register", user)
                .then(res => {
                    console.log("user created successfully")
                    commit("setLoggedIn", true)
                    dispatch("getAuth")
                })
                .catch(err => {
                    console.log("your post request to make a new user failed. Here is the error:\n" + err)
                })
        },
        Login({ commit, dispatch }, credentials) {
            auth.post('login', credentials)
                .then(res => {
                    console.log("made it back from login. Here is the response:")
                    console.log(res)
                    if (res.error) {
                        console.log("Login failed at server")
                        commit("SetLoginError", true);
                        return
                    }
                    commit("setLoggedIn", true)
                    commit("setUser", res.data.data)
                    commit("SetLoginWindow", false)
                    dispatch('GetVaults')
                })
        },
        Logout({ commit, dispatch }) {
            auth.delete('logout')
                .then((res) => {
                    dispatch('getAuth')
                    commit('setDefaultState')
                })
        },

        GetVaults({ commit, dispatch }) {
            api('my-vaults')
                .then(res => {
                    console.log(res.data.data)
                    commit('setVaults', res.data.data)
                })
        },
        AddVault({ commit, dispatch }, vault) {
            api.post('vaults', vault)
                .then(res => {
                    console.log("AddVault post request complete with the following response:")
                    console.log(res)
                    if (res.error) {
                        return console.log("something went wrong with your post vault route")
                    }
                    console.log("vault added successfully")
                    dispatch("GetVaults")
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
        },
        getAuth({ commit, dispatch }) {
            auth('authenticate')
                .then(res => {
                    console.log("authenticated. Here is the response:")
                    console.log(res)
                    if (res.data.error) {
                        console.log("no session found")
                        commit('setLoggedIn', false)
                        return router.push('/')
                    }
                    commit('setUser', res.data.data)
                    commit('setLoggedIn', true)
                    dispatch("GetVaults")
                    router.push('/')
                })
                .catch(err => {
                    commit('handleError', err)
                    router.push('/')
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