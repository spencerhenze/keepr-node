<template>
  <div class="home">
    <v-container fluid grid-list-md class="transparent">



      <v-layout row wrap>

        <!-- load results -->
        <v-flex v-bind="{ [`xs${card.flex}`]: true }" v-for="card in results" :key="card.name">

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
              <v-btn v-if="loggedIn" icon>
                <v-icon class="grey--text">favorite</v-icon>
              </v-btn>
              <v-btn v-if="loggedIn" icon>
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
              <v-icon class="grey--text bottom-icons">remove_red_eye</v-icon><span class="grey--text" v-text="card.views.length"></span>
              <v-icon class="grey--text bottom-icons">bookmark</v-icon><span class="grey--text" v-text="card.saves"></span>
            </v-flex>
          </v-card>

        </v-flex>
        <!-- end load results -->

        <!-- Modal -->
        <v-dialog v-model="dialog" lazy absolute width="80%">
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
              <v-btn v-if="loggedIn" icon>
                <v-icon class="grey--text">favorite</v-icon>
              </v-btn>
              <v-btn v-if="loggedIn" icon>
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


      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        dialog: false
      }
    },
    methods: {
      expandKeep(keep) {
        this.dialog = true;
        this.$store.dispatch('SetActiveKeep', keep)
        this.$store.dispatch('AddView', keep)
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
</style>