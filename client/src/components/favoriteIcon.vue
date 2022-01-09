<template>
    <v-btn @click="toggle" icon :color="isFavorited  ? 'red' : 'gray'">
        <v-icon>favorite</v-icon>
    </v-btn> 
</template>

<script>

export default {
    props: {
        ['results']: Object
    },
    data() {
        return { 
            isFavorited: false
        }
    },
    components: {
    },
    methods: {
        toggle(){
            this.isFavorited ? this.isFavorited=false : this.isFavorited=true;
            console.log(this.isFavorited);
        }
    },
    computed: {
    },
}
    
</script>

<style>
</style>