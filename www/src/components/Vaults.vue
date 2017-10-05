<template>
    <div class="vaults">

        <v-btn fab primary dark @click.stop="vaultForm=true">
            <v-icon>add_to_queue</v-icon>
        </v-btn>

        <div v-if="vaults.length==0" class="announcement">
            <h4>No vaults yet. Add one now</h4>
        </div>

        <v-container fluid grid-list-md style="min-height: 0;" class="transparent">
            <v-layout row wrap>
                <!-- repeating content (vaults) -->
                <v-flex v-bind="{ [`xs12`]: true }" v-for="card in vaults" :key="card.title">
                    <router-link :to="'/vaults/' + card._id">
                        <v-card class="white--text">
                            <v-container fluid grid-list-md>
                                <v-layout row>
                                    <v-flex xs2>
                                        <v-card-media src="//res.cloudinary.com/keepr/image/upload/v1507214035/design-vault_rgrq5i.png" height="125px" contain></v-card-media>
                                    </v-flex>
                                    <v-flex xs7 class="vault-text">
                                        <div>
                                            <div class="headline">{{card.name}}</div>
                                            <div>{{card.description}}</div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </router-link>
                </v-flex>
                <!-- end repeating content (vaults) -->
            </v-layout>
        </v-container>
        <!-- add a vault modal -->
        <v-dialog v-model="vaultForm" lazy absolute width="50%">
            <v-card>
                <!-- for adding a custom image for your vault -->
                <!-- <a @click.prevent="openCloud">
                    <v-card-media class="modal-image" :src="src" height="300">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </a> -->

                <v-card-title class="headline">New Vault</v-card-title>
                <v-card-text>
                    <!-- need to get the vault from the dropdown menu -->
                    <v-form>
                        <v-text-field label="Vault Name" v-model="vaultTitle" required></v-text-field>
                        <v-text-field label="Description" v-model="vaultDescription" required></v-text-field>
                        <v-btn v-if="vaultTitle && vaultDescription" success dark @click="sendVault">Add</v-btn>
                        <v-btn v-else success dark @click="sendVault" disabled>Add</v-btn>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>


    </div>
</template>

<script>
    export default {
        name: 'vaults',
        data() {
            return {
                activeKeep: {},
                msg: 'Welcome to Your Vue.js App',
                vaultForm: false,
                vaultTitle: null,
                vaultDescription: null,


            }
        },
        methods: {
            sendVault() {
                var vault = {
                    name: this.vaultTitle,
                    description: this.vaultDescription
                }
                this.$store.dispatch("AddVault", vault)
                    .then(() => {
                        this.vaultForm = false;
                    })
            }
        },
        computed: {
            vaults() {
                return this.$store.state.vaults;
            }
        }

    }

</script>

<style scoped>
    .announcement {
        display: flex;
        justify-content: center;
    }

    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .bottom-icons {
        margin-left: 15px;
        margin-bottom: 10px;
    }

    .vault-text {
        display: flex;
        align-items: center;
    }
</style>