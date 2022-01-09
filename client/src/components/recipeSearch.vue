<template>
	<v-main style="background-image:linear-gradient(#d3cfd6, #cfeef2);">
        <template>
            <div class="mt-4 d-flex justify-center">
                Search by...
            </div>
            <v-container class="d-flex justify-center">
                <!-- <v-sheet class="d-flex justify-center pt-5"> -->
                <v-slide-group  >
                    <v-slide-item v-slot="{ active, toggle }">
                    <v-btn class="mx-2" :input-value="active" active-class="purple white--text" depressed rounded @click="toggle" v-on:click="getCriteriaView('recipe')">
                        Recipe Name
                    </v-btn>
                    </v-slide-item>
                    <v-slide-item v-slot="{ active, toggle }">
                    <v-btn class="mx-2" :input-value="active" active-class="purple white--text" depressed rounded @click="toggle" v-on:click="getCriteriaView('nutrients')">
                        Nutrients
                    </v-btn>
                    </v-slide-item>
                    <v-slide-item v-slot="{ active, toggle }">
                    <v-btn class="mx-2" :input-value="active" active-class="purple white--text" depressed rounded @click="toggle" v-on:click="getCriteriaView('ingredients')">
                        Ingredients
                    </v-btn>
                    </v-slide-item>
                </v-slide-group>
                </v-container>
                <!-- </v-sheet> -->
            
                <v-container>
            <v-row class="d-flex justify-center" v-if="this.typeOfSearch==='recipe'">
                <v-card class="pa-4" flat height="10%" >
                <v-toolbar dense floating style="width: 300px"> 
                    <v-text-field style= "width: 240px" v-model="searchTerm" hide-details single-line v-on:keyup.enter="search"></v-text-field>
                    <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </v-toolbar>
                </v-card>
            </v-row>
                <ingredients v-if="this.typeOfSearch ==='ingredients'"></ingredients>
                <nutrients v-if="this.typeOfSearch ==='nutrients'"></nutrients>
                <loading v-if="isLoading"></loading>
                <v-card max-width="450" class="mx-auto" v-if="showResults">
                <v-list three-line>
                    <template v-for="(item, index) in results">  
                    <v-list-item :key="index">
                        <v-list-item-avatar>
                            <v-img :src="url+item.image"></v-img>
                        </v-list-item-avatar>             
                        <v-list-item-content>
                            <v-list-item-title v-html="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>           
                        </v-list-item-content>       
                    </v-list-item>
                    <v-divider :key="item.id"></v-divider>
                    </template>
                </v-list>
                </v-card>
            </v-container>
            <v-row></v-row>
        </template>
    </v-main>
</template>

<script>
import axios from 'axios';
import loading from './loading';
import ingredients from './ingredients';
import nutrients from './nutrients';


export default {
  components: {
    loading: loading,
    ingredients: ingredients,
    nutrients: nutrients
  },
data() {
  return {
    searchTerm: "",
    results: [],
    url: "",
    showResults: false,
    isLoading: false,
    typeOfSearch: ""
  };
},

computed: {
	isAlreadyInFavorites() { 
    return this.favoriteDogs.indexOf(this.currentDogLink) > -1;
	}
},
methods: { 
  search() {
    let urlLink = '';
    console.log(this.typeOfSearch);
    if (this.typeOfSearch==='ingredients') {
      urlLink = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients';
    } else if (this.typeOfSearch==='nutrients'){
      urlLink = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients';
    } else {
      urlLink = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search';
    }
  
  console.log(urlLink);
    this.isLoading = true;
    console.log(this.isLoading);
    const options = {
      method: 'GET',
      url: urlLink,
      params: {
        query: this.searchTerm
      },
      headers: {
        'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
      axios.request(options).then((response) => {
        console.log(response.data);
        this.results = response.data.results;
        this.url = response.data.baseUri;
        this.isLoading = false;
        this.showResults = true;
      }).catch(function (error) {
        console.error(error);
      });
    },

  addToFavorites() {
  this.favoriteDogs.push(this.currentDogLink);
  },
  removeFromFavorites(index) {
  this.favoriteDogs.splice(index, 1);
  },
  getCriteria(criteria) {
    this.typeOfSearch = criteria;
  },
  getCriteriaView(criteria) {
    this.typeOfSearch = criteria;
    console.log(criteria);
    console.log('called');
    return this.typeOfSearch
  },
},
};

//API key: 3e20cdd625fd442187cf6461da99414e
</script>


<style> 
.container {
  max-width: 100% !important;
}

</style>

