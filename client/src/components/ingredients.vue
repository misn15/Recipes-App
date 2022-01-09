<template>
  <v-main>
    <v-row justify="center"> 
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
      >
        <v-card ref="form">
          <v-card-text>
            <v-text-field
                ref="name"
                v-model="ingredients"
                :rules="[() => !!ingredients || 'This field is required']"
                
                label="Ingredients"
                placeholder="Eggs"
                required
            ></v-text-field>
            <v-text-field
                ref="numbOfRecipes"
                v-model="numbOfRecipes"
                label="Number of Recipes"
            ></v-text-field>
            <v-autocomplete
                ref="pantryItems"
                v-model="selectedPantryOption"
                :rules="[() => !!pantryOptions || 'This field is required']"
                :items="pantryOptions"
                label="Ignore pantry items?"
                placeholder="Select..."
                required
            ></v-autocomplete>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
            <v-btn
                color="primary"
                text
                @click="createParams"
            >
                Search
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
      <loading v-if="isLoading"></loading>
          <template v-for="result in results">
            <v-list-item :key="result.id">
              {{result.title}}
              <v-list-item-avatar>     
              <v-img :src="result.image"></v-img>
              </v-list-item-avatar>     
            </v-list-item>  
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
    ingredients: [],
    numbOfRecipes: '',
    results: [],
    url: "",
    showResults: false,
    isLoading: false,
    pantryOptions: ['True', 'False'],
    selectedPantryOption: '',
    params: {}
  };
},

computed: {
},
methods: { 
  createParams(){
    
    this.params = {
      ingredients: this.ingredients, 
      number: this.numbOfRecipes,
      ignorePantry: this.selectedPantryOption
      }
      console.log(this.params);
      this.search()
  },
  search() {
    
    this.isLoading = true;
    console.log(this.isLoading);
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: this.params
      ,
      headers: {
        'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
      axios.request(options).then((response) => {
        console.log(response.data);
        this.results = response.data;
        this.url = response.data.baseUri;
        this.isLoading = false;
        this.showResults = true;
      }).catch(function (error) {
        console.error(error);
      });
    },
},
};
</script>