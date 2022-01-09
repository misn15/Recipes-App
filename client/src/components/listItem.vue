<template>
         <v-list-item :key="this.results.id">
        <v-col cols="4">
        <v-card style="text-align: center">
          {{results.title}}   
          <v-list-item-avatar justify-center>  
            <v-img justify-center :src="results.image"></v-img>
          </v-list-item-avatar>  
        </v-card> 
        </v-col>
        <favoriteIcon :key="this.results.id+100" ></favoriteIcon>
          <!-- <v-btn @click="toggle" :id ="results.id" icon  :color="this.favoriteColor"> -->
        <!-- <v-icon :id ="results.id" :color="this.favoriteColor">favorite</v-icon> -->
            <!-- //<font-awesome-icon @click="changeIcon($event)" :id ="result.id" :icon="icon" ></font-awesome-icon> -->
          <!-- </v-btn>  -->
      </v-list-item> 
</template>

<script>
import favoriteIcon from './favoriteIcon';

export default {
    props: {
        ['results']: Object
    },
    components: {
        favoriteIcon: favoriteIcon
    },
    methods: {
        data() {
            return { 
            }
        }
    },
    computed: {
    },
}

</script>

<style>
</style>