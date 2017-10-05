<template>
    <div class="vaults">

        <v-btn fab primary dark @click.stop="vaultForm=true">
            <v-icon>add_to_queue</v-icon>
        </v-btn>

        <div v-if="vaults.length==0" class="announcement">
            <h4>No vaults yet. Add one now</h4>
        </div>


        <v-flex v-bind="{ [`xs${card.flex}`]: true }" v-for="card in vaults" :key="card.title">

            <v-card>
                <!-- picture & Title -->
                <v-card-media :src="card.imgUrl" height="200px" @click.stop="expandKeep(card)">
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline white--text" v-text="card.title"></span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-media>

                <!-- button row -->
                <v-card-actions class="white">
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon class="grey--text">favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon class="grey--text">bookmark</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon class="grey--text">share</v-icon>
                    </v-btn>
                </v-card-actions>

                <!-- description and counter displays -->
                <v-card-text>
                    <span class="white--text" v-text="card.description"></span>
                </v-card-text>
                <v-flex>
                    <v-icon class="grey--text bottom-icons">remove_red_eye</v-icon><span class="grey--text" v-text="card.views"></span>
                    <v-icon class="grey--text bottom-icons">bookmark</v-icon><span class="grey--text" v-text="card.saves"></span>
                </v-flex>
            </v-card>

        </v-flex>

        <!-- add a vault modal -->
        <v-dialog v-model="vaultForm" lazy absolute width="50%">
            <v-card>
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
</style>