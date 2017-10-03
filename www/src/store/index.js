import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'
import axios from 'axios'


var production = !window.location.host.includes('localhost')
var ip = production ? '//deployment location' : '//localhost:5000'

vue.use(vuex)

let api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 10000,
    withCredentials: true
})


var store = new vuex.Store({
    state: {
        user: {},
        loggedIn: false,
        results: [
            { title: 'Boise Homes', imgUrl: '//res.cloudinary.com/dvh7zccln/image/upload/v1506560973/SHP_0282_e5rzfg.jpg', description: "Boise is the greatest place on earth to live. Californians have figured that out so we've built a bunch of homes. Check them out!", flex: 12, views: 32, saves: 5 },
            { title: 'Mountain Therapy', imgUrl: '//res.cloudinary.com/dvh7zccln/image/upload/v1501022397/SHP_0604_x1szrl.jpg', description: "Sometimes you just have to escape to the mountains. Check out our hottest recommendations for places to get your zen on.", flex: 6, views: 10, saves: 10 },
            { title: 'Sick Gnar', imgUrl: '//res.cloudinary.com/dvh7zccln/image/upload/v1500221424/SHP_1220_e3cjkd.jpg', description: "Just shred bro. Check out these monster waves on tiny lakes.", flex: 6, views: 100, saves: 45 }
        ]

    },
    mutations: {
        toggleLoggedIn(store, value) {
            store.loggedIn = !store.loggedIn;
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
        GetKeeps({commit, dispatch}) {
            api('keeps').then(res => {
                commit('setResults', res.data)
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