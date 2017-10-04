<template>
    <div class="login">

        <v-layout row>
            <v-flex xs4>
                <h2>Log In</h2>
                <v-form>
                    <v-text-field label="Email" v-model="email" required></v-text-field>
                    <v-text-field label="Password" v-model="password" required></v-text-field>
                    <v-btn v-if="email && password" success dark @click="Login">Send It!</v-btn>
                    <v-btn v-else success dark @click="Login" disabled>Send It!</v-btn>
                    
                    <v-btn primary dark @click="registerForm = true">Register</v-btn>
                </v-form>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                registerForm: false,
                email: null,
                password: null
            }
        },
        methods: {
            Login() {
                var credentials = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('Login', credentials)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>