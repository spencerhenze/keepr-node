<template>
  <v-app dark>
    <!-- render drawer only if logged in -->
    <v-navigation-drawer v-if="loggedIn" persistent v-model="drawer" enable-resize-watcher>
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed>
      <!-- show drawer icon only if logged in -->
      <v-toolbar-side-icon v-if="loggedIn" @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>


      <img src="http://res.cloudinary.com/dvh7zccln/image/upload/v1506964113/powerline_k_ready_qjmbox.png" alt="" style="max-height:70px">
      <v-toolbar-title v-text="title" style="margin-left: -15px"></v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link v-if="!loggedIn" :to="{name: 'Login'}">
        <v-btn primary dark>Login</v-btn>
      </router-link>
      <v-btn v-if="loggedIn" error dark>Logout</v-btn>
      <v-btn v-if="loggedIn" @click.stop="dialog=true">Upload Something</v-btn>

    </v-toolbar>

    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">

          <!-- Build Main Content Here -->
          <router-view></router-view>
          <!-- Build Main Content Here -->

        </v-slide-y-transition>
      </v-container>
    </main>

    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>

    <!-- add keep modal -->
    <!-- <v-layout row>
      <v-flex xs12 sm3> -->
    <v-dialog v-model="dialog" lazy absolute :width="viewWidth">
      <v-card>
        <a @click.prevent="openCloud">
          <v-card-media class="modal-image" :src="src" height="300">
            <v-container fill-height fluid>
              <v-layout fill-height>
              </v-layout>
            </v-container>
          </v-card-media>
        </a>

        <v-card-title>
          <div class="headline">Upload a keep</div>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="openCloud">
            <v-text-field label="Keep Title" v-model="keepTitle" required></v-text-field>
            <v-text-field label="Description" v-model="keepDescription" required></v-text-field>
            <v-btn success dark @click="submit">Send It!</v-btn>

          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- </v-flex>
    </v-layout> -->
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        viewWidth: Math.log10(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 10) + (.6 * Math.max(document.documentElement.clientWidth, window.innerWidth)),
        drawer: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        title: 'eepr',
        dialog: false,
        // addKeepWidth: setWidth(),
        keepTitle: '',
        keepDescription: '',
        keepTags: '',
        src: '//res.cloudinary.com/keepr/image/upload/v1507065886/placeholder_uanfhh.jpg'
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn;
      }
    },
    methods: {
      openCloud() {
        // this.signedIn()
        cloudinary.openUploadWidget({ cloud_name: 'keepr', upload_preset: 'zaloay8g' },
          (error, result) => {
            this.src = result[0].url

            // build the keep item to send to the backend
            var keep = {
              name: this.keepTitle,
              description: this.keepDescription,
              imgUrl: result[0].url,
              tags: this.keepTags.split(",")
            }

            this.$store.dispatch('addKeep', keep)
          });
      }
    }


  }

</script>

<style scoped>

</style>