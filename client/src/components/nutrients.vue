<template>
  <!-- <v-spacer class="mt-12"></v-spacer> -->
  <v-container>
  <v-container class="d-flex justify-center" style="width:50%;">
    <v-col style="position: relative; height: 225px" >                                   
      <v-container style="padding-bottom:4px; height:20%">
        <v-row class="d-flex justify-center">                                                                          
          <nutrientCard @nutrientNames="getNutrientList($event)" @nutrientLimit="getLimitList($event)" @nutrientMG="getMGList($event)" style = "position: relative" class="ma-7 d-flex justify center" v-for="(c, i) in this.child" :key="i" :is= "nutrientCard" ></nutrientCard>
            <v-container class="d-flex justify-center" >
              <v-btn @click="createParams" elevation="2">Search</v-btn> 
            </v-container>  
        </v-row>
        <v-btn style="position: relative; top: -150px; left: 105%" text icon v-on:click="getNutrientCount" >
          <v-icon class="primary--text">add</v-icon>
        </v-btn>  
      </v-container>   
    </v-col>  
  </v-container>
  <loading v-if="isLoading"></loading>
  <v-container>
    <template v-for="result in results">
      <!-- <listItem :key="result.id" :result="result"></listItem> -->
      <!-- <v-list-item :key="result.id"> -->
        <recipeListItem :key="result.id" :results="result"></recipeListItem>
          
        <!-- <v-col cols="4">
        <v-card style="text-align: center">
          {{result.title}}   
          <v-list-item-avatar justify-center>  
            <v-img justify-center :src="result.image"></v-img>
          </v-list-item-avatar>  
        </v-card> 
        </v-col>
          <v-btn @click="changeIcon" :id ="result.id">
            <v-icon :id ="result.id" color="red" :disabled="disabled">favorite</v-icon>
            <font-awesome-icon @click="changeIcon($event)" :id ="result.id" :icon="icon" ></font-awesome-icon> 
          </v-btn>  -->
      <!-- </v-list-item>  -->
    </template> 
  </v-container>
  </v-container>
</template>

<script>
import axios from 'axios';
import nutrientCard from './nutrientCard';
import loading from './loading';
import recipeListItem from './listItem';
import favoriteIcon from './favoriteIcon';

export default {
    props: {},
    
    components: {
        nutrientCard: nutrientCard,
        loading: loading,
        recipeListItem: recipeListItem,
        favoriteIcon: favoriteIcon
    },

data() {
  return {
    child: [nutrientCard],
    nutrientCard: nutrientCard,
    nutrientCount: 0,
    itemSelected: false,
    showResults: false,
    isLoading: false,
    nutrientList: [],
    limitList: [],
    MGList: [],
    params: {},
    results: [],
    favoriteRecipes: [],
    disableBut: false,
    isFavorited: false
  };
},
  computed: {
      disabled() {
        //this.favorites.push(id);
        //console.log(event.currentTarget.id);
        return this.disableBut;
       }
      },

  methods: { 
    favoriteItem() {
      this.isFavorited ? this.isFavorited=false : this.isFavorited=true;
      console.log('nutrients',this.isFavorited);
      },
    getNutrientCount() {
        this.nutrientCount++;
        this.child.push(this.nutrientCard);
    },
    getNutrientList(value){
        this.nutrientList.push(value) ;
        //console.log(this.nutrientList);
        },
      getLimitList(value) {
        this.limitList.push(value)
        //console.log(this.limitList);
      },
      getMGList(value) {
        this.MGList.push(value);
        //console.log(this.MGList);
      },
      changeIcon(event) {
        //console.log(event.currentTarget.id);
        //console.log(this.favoriteRecipes);
        //console.log(this.favoriteRecipes.indexOf(event.currentTarget.id));
        this.favoriteRecipes.indexOf(event.currentTarget.id) === -1 ? this.favoriteRecipes.push(event.currentTarget.id) : this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(event.currentTarget.id),1)
        console.log(this.favoriteRecipes.indexOf(event.currentTarget.id));
        console.log(this.favoriteRecipes);
        this.disableBut = this.favoriteRecipes.indexOf(event.currentTarget.id) > -1;
        console.log(this.disableBut);
        //let elem = document.getElementById(event.currentTarget.id);
        //this.disabled(event.currentTarget.id);
        //console.log(elem.style.backgroundColor);
        //let htmlText = '<font-awesome-icon :id ="result.id" :icon="[iconType,'heart']"></font-awesome-icon>';
        //elem.getAttribute('data-prefix') === 'fas' ? elem.setAttribute('data-prefix', 'far') : elem.setAttribute('data-prefix', 'fas');
        //document.getElementById(event.currentTarget.id).setAttribute('data-prefix','fas')
        //event.currentTarget.id ===  && this.iconType === 'fas' ? this.iconType='far': this.iconType='fas';
        },

      search() {  
        this.isLoading = true;

        const options = {
          method: 'GET',
          url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients',
          params: this.params,
          headers: {
            'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
          } 
        };
      axios.request(options).then((response) => {
        console.log(response.data[1]);
        this.results = response.data;
        console.log(this.results);
        // this.url = response.data.baseUri;
         this.isLoading = false;
        // this.showResults = true;
      }).catch(function (error) {
        console.error(error);
      });
    },
    createParams() {
      // for (let i = 0; i < this.nutrientList.length; i++) {
      //   this.params[this.limitList[i].toLowerCase()+this.nutrientList[i].replace(/\s+/g, '')] = this.MGList[i];
      // }
      let fakeData = {
        "data": [ 
         {
          title:'Ham and Cheese',
          id:1, 
          img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.delish.com%2Fcooking%2Frecipe-ideas%2Frecipes%2Fa58447%2Fham-cheese-sliders-recipe%2F&psig=AOvVaw26hcafHaN3k0rP3wm-Ub5J&ust=1633903987002000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCOCahuisvvMCFQAAAAAdAAAAABAD'
          },
          {
          title:'Chicken Parmesan',
          id:2, 
          img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.delish.com%2Fcooking%2Frecipe-ideas%2Frecipes%2Fa58447%2Fham-cheese-sliders-recipe%2F&psig=AOvVaw26hcafHaN3k0rP3wm-Ub5J&ust=1633903987002000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCOCahuisvvMCFQAAAAAdAAAAABAD'
          }
        ] 
      };

      this.results = fakeData.data;
      console.log(this.results);

      //console.log(this.params);
      //this.search()
      },
  },
};
</script>

<style>
.v-list-item {
  justify-content: center;
  }
</style>
