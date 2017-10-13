<template>
    <div class="keep">

        <v-card>
            <!-- picture & Title -->
            <v-card-media class="modal-image" :src="activeKeep.imgUrl" :height="minImgHeight">
                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox class="dialog-header">
                            <span class="headline white--text" v-text="activeKeep.name"></span>
                            <v-spacer></v-spacer>
                            <v-btn fab medium class="transparent" style="box-shadow:none" @click="CloseWindow">
                                <v-icon medium>close</v-icon>
                            </v-btn>

                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-media>

            <!-- button row -->
            <v-card-actions class="white">
                <v-btn v-if="deletable" icon @click="RemoveKeep(activeKeep)">
                    <v-icon class="grey--text remove-icon">fa-trash</v-icon>
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn v-if="loggedIn" icon @click.stop="ShowSaveKeepMenu">
                    <v-icon class="grey--text">bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon class="grey--text">share</v-icon>
                </v-btn>
            </v-card-actions>

            <!-- description and counter displays -->
            <v-card-text>
                <span class="white--text" v-text="activeKeep.description"></span>
            </v-card-text>
            <v-layout row class="card-footer-row">
                <v-flex xs12 md6 class="counters-expanded">
                    <v-icon class="grey--text bottom-icons">remove_red_eye</v-icon>
                    <span class="grey--text" v-text="activeKeep.views.length"></span>
                    <v-icon class="grey--text bottom-icons">bookmark</v-icon>
                    <span class="grey--text" v-text="activeKeep.saves"></span>
                </v-flex>
                <!-- Chip  -->
                <v-flex xs12 md6 class="chip-keep-expanded">
                    <!-- <router-link :to="'/users/' + activeKeep.creatorId"> -->
                    <router-link :to="'/users/' +activeKeep.creatorId">
                        <v-chip>
                            <v-avatar>
                                <img :src="activeKeep.creatorPhoto" alt="creator photo">
                            </v-avatar>
                            {{activeKeep.creatorName}}
                        </v-chip>
                    </router-link>
                </v-flex>
            </v-layout>
        </v-card>

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

    function CalcMinImgH() {
        var vw = Math.max(document.documentElement.clientWidth, window.innerWidth)
        return .45 * vw + 'px'
    }


    export default {
        name: 'keep',
        data() {
            return {
                // viewWidth: CalculateModalW(),
                minImgHeight: CalcMinImgH(),
            }
        },
        methods: {
            SaveKeep() {
                this.$store.dispatch("SaveActiveKeep", this.selectedVault._id)
                this.$store.commit("setShowSaveMenu", false);
                this.$store.commit("setMainDialog", false);
            },

            CloseWindow() {
                this.$store.commit("setMainDialog", false);
            },

            RemoveKeep(keep) {
                this.$store.dispatch("RemoveVaultKeep", keep._id)
                this.dialog = false;
            },
            ShowSaveKeepMenu() {
                this.$store.commit("setMainDialog", false)
                this.$store.commit("setShowSaveMenu", true)
            }



        },
        props: [
            'deletable'
        ],
        computed: {
            activeKeep() {
                return this.$store.state.activeKeep
            },
            loggedIn() {
                return this.$store.state.loggedIn;
            },
        },
        beforeDestroy() {
            this.$store.dispatch('GetKeeps')
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bottom-icons {
        margin-left: 15px;
        margin-right: 0.8rem;
        margin-bottom: 10px;
    }

    .dialog-header {
        display: flex;
        align-items: flex-start;
    }


    .chip-keep {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .chip-keep-expanded {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.1rem;
        margin-right: 1.5rem;
        margin-left: 3rem;
    }

    .counters-expanded {
        margin-left: 1.1rem;
    }

    .card-footer-row {
        display: flex;
    }

    /* .modal-image {
        height: 50vh !important;
    } */
</style>