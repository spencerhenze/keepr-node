import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'
import axios from 'axios'
import router from '../router'


var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//awesome-keepr.herokuapp.com/' : '//localhost:3000/';
// selects env

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
        userKeeps: [],
        vaults: [],
        loggedIn: false,
        results: [],
        vaultKeeps: [],
        loginWindow: false,
        registerForm: false,
        loginError: false,
        error: {},
        activeVault: {},
        activeKeep: { views: [] },
        saveKeepSuccess: false,
    },
    mutations: {
        setDefaultState(store) {
            store.user = {};
            store.userKeeps = []
            store.vaults = []
            store.loggedIn = false
            store.results = []
            store.vaultKeeps = []
            store.loginWindow = false
            store.registerForm = false
            store.loginError = false
            store.error = {}
            store.activeVault = {}
            store.activeKeep = { views: [] }
            store.saveKeepSuccess = false

        },
        SetLoginWindow(store, value) {
            store.loginWindow = value;
        },
        SetRegisterForm(store, value) {
            store.registerForm = value;
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
        setUserKeeps(store, keeps) {
            store.userKeeps = keeps;
        },
        setVaults(store, vaults) {
            store.vaults = vaults;
        },
        setVaultKeeps(store, data) {
            store.vaultKeeps = data;
        },
        setResults(store, data) {
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
        clearVaultKeeps(store) {
            store.vaultKeeps = [];
        },
        setActiveVault(store, vault) {
            store.activeVault = vault;
        },
        setActiveKeep(store, keep) {
            store.activeKeep = keep;
        },
        handleError(state, err) {
            state.error = err
        },
        SetSaveKeepSuccess(state, value) {
            state.saveKeepSuccess = value;
        },

    },
    actions: {
        SetLoginWindow({ commit, dispatch }, value) {
            commit("SetLoginWindow", value)
        },
        SetRegisterForm({ commit, dispatch }, value) {
            commit("SetRegisterForm", value)
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
                    dispatch("AddVault", { name: "My Keeps", description: "A home for all of your uploaded keeps" })
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
                    dispatch('GetUserKeeps')
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
        UpdateVault({ commit, dispatch }, vault) {
            api.put('vaults/' + vault._id, vault)
                .then(res => {
                    console.log("Update vault complete:")
                    console.log(res)
                    dispatch("GetVaults")
                })
                .catch(err => {
                    console.log(err.message)
                })
        },
        DeleteVault({ commit, dispatch }, vault) {
            api.delete('vaults/' + vault._id)
                .then(res => {
                    console.log('vault deleted. Here is the response:')
                    console.log(res)
                    dispatch("GetVaults")
                })
                .catch(err => {
                    console.log(err.message)
                })
        },
        GetKeeps({ commit, dispatch }) {
            commit("setResults", [])
            api('keeps').then(res => {
                let allKeeps = res.data.data
                let filteredKeeps = []
                allKeeps.forEach(keep => {
                    if (keep.private == false) {
                        filteredKeeps.push(keep)
                    }
                })
                commit('setResults', filteredKeeps)
            })
        },
        GetUserKeeps({ commit, dispatch }) {
            commit("setUserKeeps", [])
            api('my-keeps')
                .then(res => {
                    commit('setUserKeeps', res.data)
                })
                .catch(err => {
                    console.log(err.message);
                })
        },
        AddKeep({ commit, dispatch }, keep) {
            //make a copy of the keep that doesn't have the vault key on it. The model is not expecting that.
            var purekeep = {
                name: keep.name,
                description: keep.description,
                imgUrl: keep.imgUrl,
                tags: keep.tags,
                private: keep.private,
                vault: keep.vault
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
                    keep.id = res.data.data._id
                    keep.creatorId = res.data.data.creatorId
                    // pull the vault key and value off of the original keep object and send it to the save keep route.
                    dispatch('SaveKeep', keep)
                    // dispatch("SaveToDevault", keep)
                    dispatch("GetKeeps")
                    dispatch("GetUserKeeps")
                    dispatch("GetVaults")


                })
        },
        UpdateKeep({ commit, dispatch }, keep) {
            api.put('keeps/' + store.state.activeKeep._id, keep)
                .then(res => {
                    console.log("update keep successful")
                    console.log(res)
                    dispatch("GetUserKeeps")
                    dispatch("GetKeeps")
                })
                .catch(err => {
                    console.log(err.message)
                })
        },
        DeleteActiveKeep({ commit, dispatch }) {
            api.delete('keeps/' + store.state.activeKeep._id)
                .then(res => {
                    dispatch("GetUserKeeps")
                    dispatch("GetKeeps")
                    commit("setActiveKeep", {})
                })
        },
        DeleteKeep({ commit, dispatch }, keep) {
            api.delete('keeps/' + keep._id)
                .then(res => {
                    dispatch("GetUserKeeps")
                    dispatch("GetKeeps")
                })
        },
        AddView({ commit, dispatch }, keep) {
            api.put('/keeps/' + keep._id + '/view')
                .then(res => {
                    dispatch("GetKeeps")
                })
        },
        SaveKeep({ commit, dispatch }, keep) {
            api.put('vaults/' + keep.vault + '/keeps/' + keep.id + '/save')
                .then(res => {
                    console.log(keep.name + "successfully added to vault: " + keep.vault)
                    if (keep.creatorId == store.state.user._id.toString()) {
                        dispatch("SaveToDevault", keep)
                    }
                    dispatch("GetVaults")
                })
                .catch(error => {
                    console.log(error)
                })
        },
        SaveActiveKeep({ commit, dispatch }, vaultId) {
            api.put('vaults/' + vaultId + '/keeps/' + store.state.activeKeep._id + '/save')
                .then(res => {
                    console.log(keep.name + "successfully added to vault: " + keep.vault)
                    commit("SetSaveKeepSuccess", true);
                    dispatch("GetVaults")
                })
                .catch(error => {
                    console.log(error)
                })
        },
        SaveToDevault({ commit, dispatch }, keep) {
            // set the vault to the default "My Keeps" vault
            keep.vault = store.state.vaults[0]._id
            api.put('vaults/' + keep.vault + '/keeps/' + keep.id + '/save')
                .then(res => {
                    console.log(keep.name + "successfully added keep to the default vault")
                })
                .catch(error => {
                    console.log(error)
                })
        },
        GetVault({ commit, dispatch }, id) {
            api('vaults/' + id)
                .then(res => {
                    commit("setActiveVault", res.data.data);
                    dispatch("GetVaultKeeps", res.data.data);
                })
        },
        GetVaultKeeps({ commit, dispatch }, vault) {
            let keeps = vault.keeps
            api.post('vaultkeeps', keeps)
                .then(res => {
                    console.log(res.data.keeps)
                    commit("setVaultKeeps", res.data.keeps)
                })
                .catch(err => {
                    console.log(err.message)
                })

        },
        clearActiveVault({ commit, dispatch }) {
            commit("setActiveVault", {})
        },
        SetActiveKeep({ commit, dispatch }, keep) {
            commit("setActiveKeep", keep);
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
                    dispatch("GetKeeps")
                    // router.push('/')
                })
                .catch(err => {
                    commit('handleError', err)
                    router.push('/')
                })
        },
        DeleteUserKeeps({ commit, dispatch }) {
            api.delete('removekeeps')
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.message)
                })
        },
        DeleteUserVaults({ commit, dispatch }) {
            api.delete('removevaults')
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.message)
                })

        },
        DeleteAccount({ commit, dispatch }) {
            dispatch("DeleteUserKeeps")
            dispatch("DeleteUserVaults")
            auth.delete('deleteaccount')
                .then(res => {
                    if (res.error) {
                        console.log('something went wrong')
                    }
                    commit('setDefaultState')
                    dispatch('getAuth')
                })
        }
    }
})

export default store;