<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<template>
  <!-- <div id="app"> -->
    <v-app>
      <v-card class="mx-auto overflow-hidden rounded-0" width="100%">
        <v-app-bar  src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" dark prominent height="75px">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Recipe Finder</v-toolbar-title>
          <v-spacer></v-spacer>
          <Greeting :greetingName="getName"/>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-filter</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
       
        </v-app-bar>
      </v-card>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          bottom
          temporary
          height="100%"
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4" 
            >
              <v-list-item>
                <v-list-item-title>
                  <router-link to="/">Home</router-link>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <router-link to="/about">About</router-link>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <router-link to="/search">Recipe Search</router-link>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Buzz</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
    <!-- <div id="nav"> -->
      <!-- <homeComponent/> -->
    <!-- </div> -->
    <router-view/>
  <!-- </div> -->

  </v-app>
</template>

<script>
// import recipeSearch from './components/recipeSearch';
// import HomeComponent from './components/Home/Home';
import SignUp from './components/signUp';
import Greeting from './components/greeting';


export default {
  components: {
    // recipeSearch: recipeSearch,
    // HomeComponent: HomeComponent
    SignUp: SignUp,
    Greeting: Greeting
  },
  data() {
    return {
      drawer: false,
      group: null,
      fromChild: ''
    };
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  computed: {
        getName () {
          return this.$store.state.greetingName;
        }
  },
  methods: { 
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

