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
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        title: 'eepr'
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn;
      }
    },

  }

</script>