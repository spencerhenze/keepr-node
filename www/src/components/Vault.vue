<template>
    <div class="vault">

        <v-container fluid grid-list-md class="transparent">

            <v-layout row>

                <v-flex xs3 class="vault-title-block">
                    <router-link :to="{ name: 'Vaults' }">
                        <v-btn fab primary dark>
                            <v-icon dark>keyboard_backspace</v-icon>
                        </v-btn>
                    </router-link>
                </v-flex>
                <v-flex xs9 offset-sm1 offset-md2>
                    <h3>{{activeVault.name}}</h3>
                </v-flex>
            </v-layout>

            <v-layout row wrap>


                <!-- load results -->
                <v-flex xs12 sm4 v-for="card in vaultKeeps" :key="card.title">

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
                            <v-btn icon @click="RemoveKeep(card)">
                                <v-icon class="grey--text remove-icon">fa-trash</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon class="grey--text">share</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <!-- description and counter displays -->
                        <v-card-text>
                            <span class="white--text" v-text="card.description"></span>
                        </v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 md6>
                                <v-icon class="grey--text bottom-icons">remove_red_eye</v-icon>
                                <span class="grey--text" v-text="card.views.length"></span>
                                <v-icon class="grey--text bottom-icons">bookmark</v-icon>
                                <span class="grey--text" v-text="card.saves"></span>
                            </v-flex>
                            <!-- Chip  -->
                            <v-flex xs12 md6 class="chip-keep">
                                <v-chip>
                                    <v-avatar>
                                        <img :src="card.creatorPhoto" alt="creator photo">
                                    </v-avatar>
                                    {{card.creatorName}}
                                </v-chip>
                            </v-flex>
                        </v-layout>
                    </v-card>

                </v-flex>
                <!-- end load results -->

                <!-- Modal (expand keep) -->
                <v-dialog v-model="dialog" lazy absolute :width="viewWidth">
                    <keep :deletable="true"></keep>
                </v-dialog>


            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import Keep from './Keep'

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
        name: 'vault',
        data() {
            return {
                viewWidth: CalculateModalW(),
                // activeKeep: { views: [] },
                msg: 'Welcome to Your Vue.js App',
                dialog: false,
                deletable: true
            }
        },
        components: {
            Keep
        },
        methods: {
            expandKeep(keep) {
                this.dialog = true;
                this.$store.dispatch('SetActiveKeep', keep)
                this.$store.dispatch('AddView', keep)
            },
            RemoveKeep(keep) {
                this.$store.dispatch("RemoveVaultKeep", keep._id)
                this.dialog = false;
            }
        },
        computed: {
            vaultKeeps() {
                return this.$store.state.vaultKeeps;
            },
            activeVault() {
                return this.$store.state.activeVault;
            },
            loggedIn() {
                return this.$store.state.loggedIn;
            },
        },
        beforeMount() {
            this.$store.dispatch('clearActiveVault')
        },
        mounted() {
            this.$store.dispatch('GetVault', this.$route.params.vaultId)
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-image {
        height: 50vh !important;
    }

    .vault-title-block {
        display: flex;
        justify-content: center;
    }

    a:hover {
        text-decoration: none
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
        margin-right: 0.8rem;
        margin-bottom: 10px;
    }


    .counts {
        margin-left: .4rem;
    }

    .remove-icon {
        align-self: flex-end;
    }

    .bottom-icon-container {
        display: flex;
    }

    .chip-keep {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
        margin-right: 10px;
    }
</style>