<template>
  <div class="home">
    <v-container fluid grid-list-md class="transparent">



      <v-layout row wrap>

        <!-- load results -->
        <v-flex v-bind="{ [`sm${card.flex}`]: true }" v-for="card in results" :key="card.name">

          <v-card>
            <!-- picture & Title -->
            <v-card-media :src="card.imgUrl" :height="minImgHeight" @click.stop="expandKeep(card)">
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

        <!-- Modal (expanded view)-->
        <v-dialog v-model="dialog" lazy absolute :width="viewWidth">
          <v-card>
            <!-- picture & Title -->
            <v-card-media class="modal-image" :src="activeKeep.imgUrl">
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
              <!-- <v-btn v-if="loggedIn" icon>
                <v-icon class="grey--text">favorite</v-icon>
              </v-btn> -->
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
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-icon class="grey--text bottom-icons">remove_red_eye</v-icon>
                <span class="grey--text" v-text="activeKeep.views.length"></span>
                <v-icon class="grey--text bottom-icons">bookmark</v-icon>
                <span class="grey--text" v-text="activeKeep.saves"></span>
              </v-flex>
              <!-- Chip  -->
              <v-flex xs12 md6 class="chip-keep">
                <router-link :to="'/users/' + activeKeep.creatorId">
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
        </v-dialog>

        <!-- save keep modal -->
        <v-dialog v-model="showSaveMenu" lazy absolute :width="viewWidth">
          <v-card>
            <v-card-media class="modal-image" :src="activeKeep.imgUrl" height="300">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <span class="headline white--text">{{activeKeep.name}}</span>
                </v-layout>
              </v-container>
            </v-card-media>

            <v-card-title>
              <div class="headline">Save keep</div>
            </v-card-title>
            <v-card-text>
              <!-- need to get the vault from the dropdown menu -->
              <div class="white--text" style="margin-bottom: 5rem;">{{activeKeep.description}}</div>
              <v-form>
                <v-select label="Choose Vault" v-model="selectedVault" :items="vaults" item-text="name" item-value="vault" dark required></v-select>
                <v-btn v-if="selectedVault" class="save-button" success dark @click="SaveKeep">Send It!</v-btn>
                <v-btn v-else class="save-button" success dark @click="SaveKeep" disabled>Save</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="saveKeepSuccess" lazy absolute persistent :width="viewWidth">
          <v-card>
            <v-card-title class="headline">Success</v-card-title>
            <v-card-text>
              <p>
                <v-icon medium>check_circle</v-icon> Save Successful</p>
              <v-btn success dark @click="CloseSuccessMessage">Ok</v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>


      </v-layout>
    </v-container>
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
    name: 'home',
    data() {
      return {
        viewWidth: CalculateModalW(),
        minImgHeight: CalcMinImgH(),
        dialog: false,
        showSaveMenu: false,
        selectedVault: null
      }
    },
    methods: {
      expandKeep(keep) {
        this.dialog = true;
        this.$store.dispatch('SetActiveKeep', keep)
        this.$store.dispatch('AddView', keep)
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
      }
    },
    computed: {
      results() {
        return this.$store.state.results;
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
      this.$store.dispatch('GetKeeps')
      this.$store.dispatch('getAuth')
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-image {
    height: 50vh !important;
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

  .save-button {
    width: 100%;
  }

  .chip-keep {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>