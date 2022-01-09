<template>
		<v-main>
      <template>
        <v-container class="d-flex justify-center">
        <v-card class="pa-4" flat height="10%">
          <v-toolbar dense floating>Search Recipes 
            <v-text-field v-model="searchTerm" hide-details single-line v-on:keyup.enter="search"></v-text-field>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
        </v-container>
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
   </template>
		</v-main>
</template>

<script>
import axios from 'axios';

  export default {
    props: {
      recipeDetails: {
        type: String
      }
    },
data() {
  return {
    searchTerm: "",
    results: [],
    url: "",
    showResults: false,
    isLoading: false
  };
},

computed: {
	isAlreadyInFavorites() { 
    return this.favoriteDogs.indexOf(this.currentDogLink) > -1;
	}
},
methods: { 
  search() {
    
this.isLoading = true;
console.log(this.isLoading);
const options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
  params: {
    query: this.searchTerm
  },
  headers: {
    'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};
  axios.request(options).then((response) => {
    console.log(response.data.results);
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
},
};
</script>