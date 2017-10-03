<template>
    <div class="login">

        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="openCloud">
                    <v-btn primary dark>Upload</v-btn>
                </form>
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
            openCloud() {
                this.signedIn()
                cloudinary.openUploadWidget({ cloud_name: 'tattoo-me', upload_preset: 'tattoopng' },
                    (error, result) => {
                        result[0].tags = this.tags
                        this.$store.dispatch('sendDesign', result)
                    });
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>