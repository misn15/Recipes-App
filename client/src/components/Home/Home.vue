<template>
    <div class="bg">
        <v-container mb-12 class="mainTxt">
            <h1>Welcome</h1>
            <p class="greetingText">Find new recipes to spice up your week nights and make eating exciting</p>
        </v-container>
        <v-row fill-height class="d-flex justify-center align-center">
            <v-btn elevation="2" outlined color="black" @click="$router.push('search')"> 
                    Search Recipes
            </v-btn>
        </v-row>
        <v-row class="ma-10 d-flex justify-center">
            Or
        </v-row>
        <v-row class="d-flex justify-center">
            <v-btn elevation="2" width="11%" outlined color="black" @click="$router.push('signup')"> 
                    Sign Up
            </v-btn>
            <v-btn elevation="2" outlined width="11%" color="black" @click="$router.push('signin')">
                Log In
            </v-btn>   
        </v-row>
    </div>  
</template>

<script>

export default {
    props: {
        },
    data() {
        },
    components: {
        },
    methods: {
        },
    computed: {
        },
}
    
</script>

<style>

.bg {
    background-color: EBECF0;
    height: 100%;
}

.greetingText {
    font-family: Verdana;
    font-size: 1.2em;
}

.mainTxt {
    padding-top: 5%;
}

</style>