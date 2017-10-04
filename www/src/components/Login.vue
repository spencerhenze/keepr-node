<template>
    <div class="login">


        <!-- success message only displays when successful user created -->
        <v-card v-if="successMessage">
            <v-card-title class="headline">Success</v-card-title>
            <v-card-text>
                <p>
                    <v-icon medium>check_circle</v-icon> Registered Successfully</p>
                <v-btn success dark @click="CloseLoginWindow">Ok</v-btn>
            </v-card-text>
        </v-card>

        <!-- fail message displays on login fail -->
        <v-card v-else-if="failMessage">
            <v-card-title class="headline">Oops!</v-card-title>
            <v-card-text>
                <p>
                    <v-icon medium>error_outline</v-icon> Login Failed </p>
                <v-btn error dark @click="failMessage=false">Try Again</v-btn>
            </v-card-text>
        </v-card>



        <!-- Register form -->
        <v-card v-else-if="registerForm">
            <v-card-title class="headline">Register</v-card-title>
            <!-- <v-spacer></v-spacer>
            <v-btn @click="CloseLoginWindow">
                <v-icon medium>close</v-icon>
            </v-btn> -->
            <v-card-text>

                <v-form>
                    <v-text-field label="Name" v-model="name" required></v-text-field>
                    <v-text-field label="Email" v-model="email" required></v-text-field>
                    <v-text-field label="Password" v-model="password" required></v-text-field>
                    <v-text-field label="Confirm Password" v-model="confirmPassword" required></v-text-field>
                    <p v-if="confirmPassword && password!=confirmPassword" class="red">Passwords don't match</p>
                    <v-btn v-if="name && email && password && password==confirmPassword" success dark @click.stop="RegisterUser">Submit</v-btn>
                    <v-btn v-else success dark disabled>Submit</v-btn>
                    <v-btn primary dark @click="registerForm = false">Back to Login</v-btn>
                </v-form>

            </v-card-text>
        </v-card>

        <!-- login form -->
        <v-card v-else>
            <div class="loginModalHeader">
                <v-card-title class="headline">Log In</v-card-title>
                <v-spacer></v-spacer>
                <v-btn fab medium class="transparent" style="box-shadow:none" @click="CloseLoginWindow">
                    <v-icon medium>close</v-icon>
                </v-btn>
            </div>

            <v-card-text>

                <v-form>
                    <v-text-field label="Email" v-model="email" required></v-text-field>
                    <v-text-field label="Password" v-model="password" required></v-text-field>
                    <v-btn v-if="email && password" success dark @click="Login">Send It!</v-btn>
                    <v-btn v-else success dark @click="Login" disabled>Send It!</v-btn>

                    <v-btn primary dark @click="registerForm = true">Register</v-btn>
                </v-form>

            </v-card-text>
        </v-card>



    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                registerForm: false,
                name: null,
                email: null,
                password: null,
                confirmPassword: null,
                successMessage: false,
                failMessage: false,
            }
        },
        props: [
            'loginWindow'
        ],
        methods: {
            Login() {
                var credentials = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('Login', credentials)
                if (!loggedIn) {
                    failMessage = true;
                }
            },
            RegisterUser() {
                if (this.password == this.confirmPassword) {
                    var newUser = {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('Register', newUser)
                    this.successMessage = true;
                }
            },
            CloseLoginWindow() {
                this.$store.dispatch("SetLoginWindow", false);
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.loggedIn;
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .loginModalHeader {
        display: flex;
    }
</style>