<template>
    <div class="keep">

        <v-layout row>
            <v-flex xs12>
                <v-dialog v-model="dialog" lazy absolute width="100%">
                    <v-card>
                        <!-- picture & Title -->
                        <v-card-media class="modal-image" :src="activeKeep.imgUrl" :height="imgHeight">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text" v-text="activeKeep.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-media>

                        <!-- button row -->
                        <v-card-actions class="white">
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
                        <v-flex>
                            <v-icon class="grey--text bottom-icons">remove_red_eye</v-icon><span class="grey--text" v-text="activeKeep.views.length"></span>
                            <v-icon class="grey--text bottom-icons">bookmark</v-icon><span class="grey--text" v-text="activeKeep.saves"></span>
                        </v-flex>
                    </v-card>
                </v-dialog>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    function CalcImgHeight() {
        var vw = Math.max(document.documentElement.clientWidth, window.innerWidth)
        return .71428 * vw;
    }

    export default {
        name: 'keep',
        data() {
            return {
                dialog: true,
                imgHeight: CalcImgHeight()
            }
        },
        methods: {
            openCloud() {
                this.signedIn()
                cloudinary.openUploadWidget({ cloud_name: 'tattoo-me', upload_preset: 'tattoopng' },
                    (error, result) => {
                        result[0].tags = this.tags
                        this.$store.dispatch('sendDesign', result)
                    });
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.loggedIn;
            },
            activeKeep() {
                return this.$store.state.activeKeep;
            }
        },
        mounted() {
            this.$store.dispatch("GetKeep", this.$route.params.keepId)
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bottom-icons {
        margin-left: 15px;
        margin-bottom: 10px;
    }
</style>