<template>
    <div class="login">

        <v-layout row>
            <v-flex xs12>
                <h2>This is where you log in</h2>
                <router-link :to="{name: 'Home'}">
                    <v-btn success dark @click="toggleLoggedIn">Login</v-btn>
                </router-link>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods: {
            toggleLoggedIn() {
                this.$store.commit('toggleLoggedIn')
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>