<template>
  <v-app dark>
    <!-- render drawer only if logged in -->
    <v-navigation-drawer v-if="loggedIn" persistent v-model="drawer" enable-resize-watcher>
      <v-list>
        <router-link class="sidebar-header" :to="{ name: 'Profile' }">

          <img :src="user.profileImg" class="img-circle img-responsive sidebar-profile-image">


          <h5 class="sidebar-text" style="margin-right:10px">{{user.name}}</h5>
          </v-list-tile-content>
        </router-link>

        <router-link :to="{name:'Home'}">
          <v-list-tile class="sidebar-tile">
            <v-list-tile-action>
              <v-icon class="sidebar-icon">explore</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="sidebar-text-parent">
              <v-list-tile-title class="sidebar-text">explore</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link :to="{name:'Vaults'}">
          <v-list-tile class="sidebar-tile">
            <v-list-tile-action>
              <v-icon class="sidebar-icon">fa-archive</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="sidebar-text-parent">
              <v-list-tile-title class="sidebar-text">Vaults</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link :to="{name:'MyKeeps'}">
          <v-list-tile class="sidebar-tile">
            <v-list-tile-action>
              <v-icon class="sidebar-icon">fingerprint</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="sidebar-text-parent">
              <v-list-tile-title class="sidebar-text">My Keeps</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>


      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed>
      <!-- show drawer icon only if logged in -->
      <v-toolbar-side-icon v-if="loggedIn" @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>


      <img src="http://res.cloudinary.com/dvh7zccln/image/upload/v1506964113/powerline_k_ready_qjmbox.png" alt="" style="max-height:70px">
      <v-toolbar-title v-text="title" style="margin-left: -15px"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!loggedIn" primary dark @click.stop="OpenRegisterWindow">Register</v-btn>
      <v-btn v-if="!loggedIn" fab dark medium class="transparent" style="box-shadow:none; margin-right:1.5rem;" @click.stop="OpenLoginWindow">
        <v-icon>fa-sign-in</v-icon>
      </v-btn>
      <router-link v-if="loggedIn && cWidth>=518" :to="{ name: 'Profile'}">
        <div id="user-identifier">
          <p id="user-name-display">{{user.name}}</p>
          <img :src="user.profileImg" class="img-circle img-responsive top-profile-image">
        </div>

      </router-link>
      <v-btn v-if="loggedIn" fab dark medium class="transparent" style="box-shadow:none" @click.stop="dialog=true">
        <v-icon x-large>add_circle</v-icon>
      </v-btn>
      <v-btn v-if="loggedIn" fab dark small class="red" style="margin-right:15px" @click="Logout">
        <v-icon dark>fa-sign-out</v-icon>
      </v-btn>

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
          <!-- need to get the vault from the dropdown menu -->
          <v-form>
            <v-select label="Choose Vault" v-model="selectedVault" :items="vaults" item-text="name" item-value="vault" dark required></v-select>
            <v-text-field label="Keep Title" v-model="keepTitle" required></v-text-field>
            <v-text-field label="Description" v-model="keepDescription" required></v-text-field>
            <v-text-field label="Tags (comma separated, no spaces)" v-model="keepTags"></v-text-field>
            <v-switch label="Private Keep" v-model="private"></v-switch>
            <v-btn v-if="selectedVault && keepTitle && keepDescription" success dark @click="sendKeep">Send It!</v-btn>
            <v-btn v-else success dark @click="sendKeep" disabled>Send It!</v-btn>
          </v-form>

        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- login/register modal -->
    <v-dialog v-model="loginWindow" lazy absolute persistent :width="viewWidth">
      <login></login>
    </v-dialog>

  </v-app>
</template>

<script>
  import Login from './components/login'

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

  function GetClientWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth)
  }

  function CalcImgWidth() {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth)
    var keepImgH = .45 * vw //+ 'px'
    return 1.45 * keepImgH
  }


  export default {
    data() {
      return {
        viewWidth: CalculateModalW(),
        cWidth: GetClientWidth(),
        imgWidth: CalcImgWidth(),
        drawer: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        title: 'eepr',
        dialog: false,
        // addKeepWidth: setWidth(),
        keepTitle: null,
        keepDescription: null,
        keepTags: [],
        src: '//res.cloudinary.com/keepr/image/upload/v1507065886/placeholder_uanfhh.jpg',
        selectedVault: null,
        private: false,
      }
    },
    components: {
      Login
    },
    mounted() {
      this.$store.dispatch("getAuth");
      // when logged in, get the vaults every time this page loads
      if (this.$store.loggedIn) {
        this.$store.dispatch('GetVaults');
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn;
      },
      vaults() {
        return this.$store.state.vaults;
      },
      loginWindow() {
        return this.$store.state.loginWindow;
      },
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      OpenLoginWindow() {
        this.$store.dispatch("SetLoginWindow", true);
      },
      OpenRegisterWindow() {
        this.$store.dispatch("SetLoginWindow", true);
        this.$store.dispatch("SetRegisterForm", true);
      },
      CloseLoginWindow() {
        this.$store.dispatch("SetLoginWindow", false);
        this.$store.dispatch("SetRegisterForm", false);
      },
      openCloud() {
        // this.signedIn()
        cloudinary.openUploadWidget({ cloud_name: 'keepr', upload_preset: 'zaloay8g' },
          (error, result) => {
            this.src = result[0].url
          });
      },
      sendKeep() {
        var keep = {
          name: this.keepTitle,
          description: this.keepDescription,
          imgUrl: this.src,
          tags: this.keepTags.split(","),
          private: this.private,
          vault: this.selectedVault._id
        }
        console.log("logging from App.vue sendKeep() method:\n" + keep)
        this.$store.dispatch('AddKeep', keep)
        this.dialog = false;
        this.keepTitle = null;
        this.keepDescription = null;
        this.src = '//res.cloudinary.com/keepr/image/upload/v1507065886/placeholder_uanfhh.jpg';
        this.keepTags = null;
        this.private = false;
        this.selectedVault = null;
      },
      Logout() {
        this.$store.dispatch("Logout")
      }
    }


  }

</script>

<style scoped>
  a {
    text-decoration: none;
  }

  #user-name-display {
    margin-top: 18px;
    margin-right: 10px;
  }

  #user-identifier {
    align-items: center;
    color: white;
    display: flex;
    margin-right: .4rem;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .sidebar-profile-image {
    max-width: 80px;
    max-height: 80px;
    border-radius: 50;
  }

  .top-profile-image {
    max-width: 40px;
    max-height: 40px;
    /* border-radius: 50; */
  }
</style>