<template>
    <div class="mykeeps">
        <v-container fluid grid-list-md class="transparent">

            <v-layout row>
                <v-flex xs12 class="flex-display" justify-center flexbox>
                    <h3>Manage My Keeps</h3>
                    <v-icon class="header-icon">fingerprint</v-icon>

                </v-flex>
            </v-layout>


            <v-layout row wrap>

                <!-- load results -->
                <v-flex xs12 sm6 md4 lg3 v-for="card in results" :key="card.name">

                    <v-card>
                        <!-- picture & Title -->
                        <v-card-media :src="card.imgUrl" height="200px" @click.stop="expandKeep(card)">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text" v-text="card.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-media>

                        <!-- button row -->
                        <v-card-actions class="white">
                            <v-spacer></v-spacer>
                            <v-btn icon @click.stop="expandKeep(card)">
                                <v-icon class="grey--text">edit</v-icon>
                            </v-btn>
                            <v-btn v-if="loggedIn" icon @click.stop="DeleteKeep(card)">
                                <v-icon class="grey--text">fa-trash</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <!-- description and counter displays -->
                        <v-card-text>
                            <span class="white--text" v-text="card.description"></span>
                        </v-card-text>
                        <v-flex>
                            <v-icon class="grey--text bottom-icons">remove_red_eye</v-icon><span class="grey--text" v-text="card.views.length"></span>
                            <v-icon class="grey--text bottom-icons">bookmark</v-icon><span class="grey--text" v-text="card.saves"></span>
                        </v-flex>
                    </v-card>

                </v-flex>
                <!-- end load results -->

                <!-- Modal (expanded view)-->
                <v-dialog v-model="dialog" lazy absolute width="80%">
                    <v-card>
                        <!-- picture & Title -->
                        <v-card-media class="modal-image" :src="activeKeep.imgUrl">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text">Edit Keep</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-media>

                        <!-- button row -->
                        <v-card-actions class="white">
                            <v-spacer></v-spacer>
                            <!-- Edit this to add editing capabilities -->
                            <v-btn v-if="loggedIn" icon @click.stop="DeleteActiveKeep">
                                <v-icon class="grey--text">fa-trash</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon class="grey--text">share</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <!-- description and counter displays -->
                        <v-card-text>
                            <v-form>
                                <v-select label="Change Vault" v-model="selectedVault" :items="vaults" item-text="name" item-value="vault" dark></v-select>
                                <v-text-field label="Keep Title" v-model="keepTitle" required></v-text-field>
                                <v-text-field label="Description" v-model="keepDescription" required></v-text-field>
                                <!-- <v-text-field label="Tags (comma separated, no spaces)" v-model="keepTags"></v-text-field> -->
                                <v-switch label="Private Keep" v-model="private"></v-switch>
                                <v-btn success dark @click="UpdateKeep">Update</v-btn>
                            </v-form>
                        </v-card-text>
                        <v-flex>
                            <v-icon class="grey--text bottom-icons">remove_red_eye</v-icon><span class="grey--text" v-text="activeKeep.views.length"></span>
                            <v-icon class="grey--text bottom-icons">bookmark</v-icon><span class="grey--text" v-text="activeKeep.saves"></span>
                        </v-flex>
                    </v-card>
                </v-dialog>



            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'mykeeps',
        data() {
            return {
                keepTitle: null,
                keepDescription: null,
                selectedVault: null,
                // tags: this.activeKeep.tags,
                private: false,
                dialog: false
                // showSaveMenu: false,
            }
        },
        methods: {
            expandKeep(keep) {
                this.dialog = true;
                this.$store.dispatch('SetActiveKeep', keep)
            },
            ShowSaveKeepMenu() {
                this.dialog = false;
                this.showSaveMenu = true;
            },
            SaveKeep() {
                this.$store.dispatch("SaveActiveKeep", this.selectedVault._id)
                this.showSaveMenu = false;
                this.dialog = false;
            },
            CloseSuccessMessage() {
                this.$store.commit("SetSaveKeepSuccess", false)
            },
            DeleteActiveKeep() {
                this.$store.dispatch("DeleteActiveKeep");
                this.dialog = false;
            },
            DeletKeep(keep) {
                this.$store.dispatch("DeleteKeep")
            },
            UpdateKeep() {
                var keep = {
                    private: this.private
                }
                if (this.keepTitle) {
                    keep.name = this.keepTitle;
                }
                if (this.keepDescription) {
                    keep.description = this.keepDescription;
                }
                if (this.selectedVault) {
                    keep.vault = this.selectedVault._id
                }
                this.$store.dispatch('UpdateKeep', keep)
                this.dialog = false;
            }
        },
        computed: {
            results() {
                return this.$store.state.userKeeps;
            },
            activeKeep() {
                return this.$store.state.activeKeep
            },
            loggedIn() {
                return this.$store.state.loggedIn;
            },
            vaults() {
                return this.$store.state.vaults;
            },
            saveKeepSuccess() {
                return this.$store.state.saveKeepSuccess;
            }
        },
        mounted() {
            this.$store.dispatch('GetUserKeeps')
            this.$store.dispatch('getAuth')
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-image {
        height: 30vh !important;
    }

    .header-icon {
        font-size: 3em;
        margin-left: 1.5rem;
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

    .flex-display {
        display: flex;
    }

    .bottom-icons {
        margin-left: 15px;
        margin-right: 0.8rem;
        margin-bottom: 10px;
    }

    .save-button {
        width: 100%;
    }
</style>