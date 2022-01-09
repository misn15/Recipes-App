<template>
    <v-main>              
        <v-card class="d-flex justify-center">         
          <v-card-text >  
            <v-row class="pa-3">      
              <v-select style="width:28%"
              v-model="selectedNutrient"
              :items="items"
              label="Nutrients"
              @input="sendNutrientNames"
              >
            </v-select>     
            <v-spacer class="pa-3"></v-spacer>
              <v-select style="width:28%"
              v-model="selectedLimit"
              :items="maxMin"
              label="Max/Min?"
              @input="sendNutrientLimit"
              >
              </v-select>
            <v-spacer class="pa-3"></v-spacer>
              <v-select style="width:28%"
              v-model="selectedMG"
              :items="milligrams"
              label="Number of Milligrams"
              @input="sendNutrientMG"
              >
              </v-select>
            </v-row>  
          </v-card-text>
        </v-card>  
        <!-- <v-container class="d-flex justify-center" >
          <v-btn @click="getParams" elevation="2">Search</v-btn> 
        </v-container>       -->
    </v-main>
</template>

<script>

export default {
    props: {
    },

data() {
  return {
    selectedNutrient: "",
    selectedLimit: "",
    selectedMG: 0,
    maxMin: ['Max', 'Min'],
    milligrams: [1,2,3,4,5,6,7,9,9,10],
    itemSelected: false,
    items: ['Phosphorus', 'Iron', 'Protein', 'Vitamin C', 'Selenium', 'Fluoride', 'Vitamin B5', 'Vitamin B3', 'Iodine', 'Carbs', 
    'Calories', 'Alcohol', 'Copper', 'Choline', 'Vitamin B6', 'Manganese', 'Sodium', 'Sugar', 'Fat', 'Choline', 'Vitamin B2', 
    'Vitamin B12', 'Folic Acid', 'Zinc', 'Caffeine', 'Vitamin D', 'Vitamin E', 'Fiber', 'Folate', 'Potassium', 'Cholesterol',
    'Saturated Fat', 'Calcium', 'Vitamin B1', 'Magnesium', 'Sodium', 'Vitamin K', 'Vitamin A', 'Vitamin B6']
  };
},

computed: {
  
  },

methods: { 
  selectItem() {
      //console.log(this.selectedNutrient);
      if (this.selectedItem!== ''){
          this.itemSelected = true;
          }
      },
      sendNutrientNames() {
        this.$emit('nutrientNames',this.selectedNutrient) 
      },
      sendNutrientLimit() {
        this.$emit('nutrientLimit',this.selectedLimit)
      },
      sendNutrientMG() {
        this.$emit('nutrientMG', this.selectedMG)
      },
  } 
};
</script>

<style>
.theme--light.v-application {
    height: 50px;
}

</style>