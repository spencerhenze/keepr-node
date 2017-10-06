<template>
    <div class="profile">
        <v-layout row>
            <v-flex xs12 class="flex-and-center">
                <h3>Profile</h3>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm4 md3 class="flex-and-center">
                <img :src="user.profileImg" class="img-circle img-responsive profile-image" alt="profile img">
            </v-flex>
            <v-flex xs12 sm8 md9>
                <h5 class="sidebar-text" style="margin-right:10px">{{user.name}}</h5>
                <p>Email: {{user.email}}</p>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 class="flex-and-center">
                <router-link :to="{ name: 'MyKeeps'}">
                    <v-btn primary dark>Manage My Keeps</v-btn>
                </router-link>

                <v-btn error dark @click.stop="areYouSure=true">Delete My Account</v-btn>
            </v-flex>
        </v-layout>


        <!-- are you sure modal -->
        <v-dialog v-model="areYouSure" lazy absolute :width="viewWidth">

            <v-card>
                <v-card-title class="headline">Are you sure?</v-card-title>
                <v-card-text>

                    <v-icon medium>error_outline</v-icon>
                    <p>We're sorry to see you go. Click Delete to permanently delete your account and all uploaded keeps forever.
                    </p>
                    <v-btn error dark @click="DeleteAccount">Delete</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>



    </div>
</template>

<script>
    function CalculateModalW() {
        var vw = Math.max(document.documentElement.clientWidth, window.innerWidth)
        if (vw <= 600) {
            return "90%"
        }
        else if (600 < vw && vw <= 768) {
            var width = (-45 / 302) * vw + (25140 / 151)
            return width.toString() + "%";
        }
        else if (768 < vw && vw <= 1264) {
            var width = (-35 / 302) * vw + (25140 / 151)
            return width.toString() + "%";
        }
        else if (vw > 1264) {
            return "25%"
        }
    }

    export default {
        name: 'profile',
        data() {
            return {
                viewWidth: CalculateModalW(),
                activeKeep: {},
                msg: 'Welcome to Your Vue.js App',
                dialog: false,
                areYouSure: false
            }
        },
        methods: {
            DeleteAccount() {
                this.$store.dispatch("DeleteAccount");
                this.areYouSure = false;
                this.dialog = false;
                this.$store.dispatch("getAuth")
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        }

    }

</script>

<style scoped>
    .profile-image {
        max-width: 200px;
        max-height: 200px;
        border-radius: 50;
    }

    .flex-and-center {
        display: flex;
        justify-content: center;
    }

    .flex-column {
        flex-direction: column;
    }
</style>